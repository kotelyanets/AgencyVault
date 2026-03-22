"use server";

import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function updateWorkspaceName(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Utilizador não autenticado.");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Sem permissões para alterar o nome da agência.");
  }

  const name = (formData.get("name") as string | null)?.trim();

  if (!name) {
    throw new Error("O nome da agência é obrigatório.");
  }

  await prisma.workspace.update({
    where: { id: session.user.workspaceId },
    data: { name },
  });

  revalidatePath("/", "layout");
}

export async function updateUserPassword(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Utilizador não autenticado.");
  }

  const newPassword = (formData.get("newPassword") as string | null)?.trim();
  const confirmPassword = (formData.get("confirmPassword") as string | null)?.trim();

  if (!newPassword || !confirmPassword) {
    throw new Error("Preencha todos os campos da password.");
  }

  if (newPassword.length < 8) {
    throw new Error("A nova password deve ter pelo menos 8 caracteres.");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("As passwords não coincidem.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashedPassword },
  });
}
