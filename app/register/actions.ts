"use server";

import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export async function registerUser(formData: FormData) {
  const name = (formData.get("name") as string | null)?.trim();
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();
  const password = (formData.get("password") as string | null)?.trim();
  const workspaceName = (formData.get("workspaceName") as string | null)?.trim();

  if (!name || !email || !password || !workspaceName) {
    throw new Error("Preencha todos os campos obrigatórios.");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    throw new Error("Já existe uma conta com este email.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: { name: workspaceName },
      select: { id: true },
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

  redirect("/login");
}
