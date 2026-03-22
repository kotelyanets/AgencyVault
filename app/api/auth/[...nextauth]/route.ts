import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            workspace: {
              select: {
                plan: true,
              },
            },
          },
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          workspaceId: user.workspaceId,
          role: user.role,
          isSuperAdmin: user.isSuperAdmin,
          workspacePlan: user.workspace?.plan ?? "TRIAL",
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.workspaceId = user.workspaceId;
        token.role = user.role;
        token.isSuperAdmin = user.isSuperAdmin;
        token.workspacePlan = user.workspacePlan;
      }

      if (token.workspaceId && !token.workspacePlan) {
        const workspace = await prisma.workspace.findUnique({
          where: { id: token.workspaceId },
          select: { plan: true },
        });
        token.workspacePlan = workspace?.plan ?? "TRIAL";
      }

      return token;
    },
    async session({ session, token }) {
      session.workspacePlan = token.workspacePlan ?? "TRIAL";

      if (token && session.user) {
        session.user.id = token.id;
        session.user.workspaceId = token.workspaceId;
        session.user.role = token.role;
        session.user.isSuperAdmin = token.isSuperAdmin;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "supersecret123",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
