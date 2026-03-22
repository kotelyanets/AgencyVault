"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createClient(formData: FormData) {
  const name = (formData.get("name") as string | null)?.trim();
  const nif = (formData.get("nif") as string | null)?.trim();

  if (!name) return;

  // 1. Ensure a Workspace Exists (Seed)
  let workspace = await prisma.workspace.findFirst();
  if (!workspace) {
    workspace = await prisma.workspace.create({
      data: { name: 'Gabinete Contabilidade Silva' }
    });
  }

  // 2. Insert the new client
  await prisma.client.create({
    data: {
      name,
      nif: nif || undefined,
      workspaceId: workspace.id
    }
  });

  const session = await getServerSession(authOptions);
  if (session?.user) {
    await prisma.auditLog.create({
      data: {
        action: `Criou cliente: ${name}`,
        userId: session.user.id,
      }
    });
  }

  // 3. Revalidate path so the table updates instantly
  revalidatePath("/dashboard/clientes");
}

export async function updateClient(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Utilizador não autenticado.");
  }

  const name = (formData.get("name") as string | null)?.trim();
  const nif = (formData.get("nif") as string | null)?.trim();

  if (!name) {
    throw new Error("Nome do cliente é obrigatório.");
  }

  const existingClient = await prisma.client.findUnique({
    where: { id },
    select: { id: true, workspaceId: true, name: true },
  });

  if (!existingClient || existingClient.workspaceId !== session.user.workspaceId) {
    throw new Error("Cliente não encontrado.");
  }

  await prisma.client.update({
    where: { id },
    data: {
      name,
      nif: nif || null,
    },
  });

  await prisma.auditLog.create({
    data: {
      action:
        existingClient.name !== name
          ? `Editou cliente: ${existingClient.name} → ${name}`
          : `Editou cliente: ${name}`,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard/clientes");
}

export async function deleteClient(id: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Utilizador não autenticado.");
  }

  if (!["ADMIN", "MANAGER"].includes(session.user.role)) {
    throw new Error("Sem permissões para eliminar clientes.");
  }

  const existingClient = await prisma.client.findUnique({
    where: { id },
    select: { id: true, name: true, workspaceId: true },
  });

  if (!existingClient || existingClient.workspaceId !== session.user.workspaceId) {
    throw new Error("Cliente não encontrado.");
  }

  await prisma.client.delete({
    where: { id: existingClient.id },
  });

  await prisma.auditLog.create({
    data: {
      action: `Eliminou cliente: ${existingClient.name}`,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard/clientes");
}
