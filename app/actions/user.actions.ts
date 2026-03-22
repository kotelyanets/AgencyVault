"use server";

import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const ALLOWED_ROLES: Role[] = [Role.ADMIN, Role.MANAGER, Role.MEMBER];

export async function addTeamMember(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Utilizador não autenticado.");
  }

  if (![Role.ADMIN, Role.MANAGER].includes(session.user.role)) {
    throw new Error("Sem permissões para adicionar membros.");
  }

  const name = (formData.get("name") as string | null)?.trim();
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();
  const roleValue = formData.get("role") as string | null;
  const role = ALLOWED_ROLES.find((entry) => entry === roleValue);

  if (!name || !email || !role) {
    throw new Error("Dados inválidos para criação de utilizador.");
  }

  const hashedPassword = await bcrypt.hash("Mudar123!", 10);

  await prisma.user.create({
    data: {
      name,
      email,
      role,
      password: hashedPassword,
      workspaceId: session.user.workspaceId,
    },
  });

  revalidatePath("/dashboard/equipa");
}
