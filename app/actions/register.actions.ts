"use server";

import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { Role } from "@prisma/client";

import { prisma } from "@/lib/prisma";

interface RegisterInput {
  workspaceName: string;
  name: string;
  email: string;
  password: string;
}

interface RegisterResult {
  success: boolean;
  error?: string;
}

export async function registerWorkspaceAdmin(input: RegisterInput): Promise<RegisterResult> {
  const workspaceName = input.workspaceName?.trim();
  const name = input.name?.trim();
  const email = input.email?.trim().toLowerCase();
  const password = input.password;

  if (!workspaceName || !name || !email || !password) {
    return { success: false, error: "Preencha todos os campos." };
  }

  if (password.length < 8) {
    return { success: false, error: "A password deve ter pelo menos 8 caracteres." };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.$transaction(async (tx) => {
      const workspace = await tx.workspace.create({
        data: {
          name: workspaceName,
          plan: "TRIAL",
          subscriptionStatus: "ACTIVE",
        },
      });

      await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: Role.ADMIN,
          workspaceId: workspace.id,
        },
      });
    });

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { success: false, error: "Já existe um utilizador com este email." };
    }

    console.error("Erro ao registar workspace/admin:", error);
    return { success: false, error: "Não foi possível criar a conta. Tente novamente." };
  }
}
