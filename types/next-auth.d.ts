import type { Role } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      workspaceId: string;
      role: Role;
      isSuperAdmin: boolean;
    };
  }

  interface User {
    id: string;
    workspaceId: string;
    role: Role;
    isSuperAdmin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    workspaceId: string;
    role: Role;
    isSuperAdmin: boolean;
  }
}
