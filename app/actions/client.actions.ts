"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getAuthenticatedContext() {
  // Security check: every action requires an authenticated user and workspace context.
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const workspaceId = session?.user?.workspaceId;

  if (!userId || !workspaceId) {
    throw new Error("Access Denied");
  }

  return { userId, workspaceId, role: session.user.role };
}

export async function createClient(formData: FormData) {
  const { userId, workspaceId } = await getAuthenticatedContext();

  const name = (formData.get("name") as string | null)?.trim();
  const nif = (formData.get("nif") as string | null)?.trim();

  if (!name) {
    throw new Error("Failed to create client");
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Security check: workspaceId is always derived from the server session.
      await tx.client.create({
        data: {
          name,
          nif: nif || undefined,
          workspaceId,
        },
      });

      await tx.auditLog.create({
        data: {
          action: `Criou cliente: ${name}`,
          userId,
        },
      });
    });

    revalidatePath("/dashboard/clientes");
  } catch {
    throw new Error("Failed to create client");
  }
}

export async function getClients() {
  const { workspaceId } = await getAuthenticatedContext();

  try {
    // Security check: list query is strictly scoped by authenticated workspace.
    return await prisma.client.findMany({
      where: { workspaceId },
      include: {
        credentials: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  } catch {
    throw new Error("Access Denied");
  }
}

export async function getClientById(id: string) {
  const { workspaceId } = await getAuthenticatedContext();

  if (!id) {
    throw new Error("Access Denied");
  }

  try {
    // Security check: object access is scoped to the current workspace to prevent IDOR.
    const client = await prisma.client.findFirst({
      where: {
        id,
        workspaceId,
      },
      include: {
        credentials: {
          orderBy: { platformName: "asc" },
        },
      },
    });

    if (!client) {
      throw new Error("Access Denied");
    }
    });

    return client;
  } catch {
    throw new Error("Access Denied");
  }
}

export async function updateClient(id: string, formData: FormData) {
  const { userId, workspaceId } = await getAuthenticatedContext();

  const name = (formData.get("name") as string | null)?.trim();
  const nif = (formData.get("nif") as string | null)?.trim();

  if (!name) {
    throw new Error("Failed to update client");
  }

  try {
    await prisma.$transaction(async (tx) => {
      const existingClient = await tx.client.findFirst({
        where: { id, workspaceId },
        select: { id: true, name: true },
      });

      if (!existingClient) {
        throw new Error("Access Denied");
      }

      await tx.client.update({
        where: { id: existingClient.id },
        data: {
          name,
          nif: nif || null,
        },
      });

      await tx.auditLog.create({
        data: {
          action:
            existingClient.name !== name
              ? `Editou cliente: ${existingClient.name} → ${name}`
              : `Editou cliente: ${name}`,
          userId,
        },
      });
    });

    revalidatePath("/dashboard/clientes");
  } catch {
    throw new Error("Failed to update client");
  }
}

export async function deleteClient(id: string) {
  const { userId, workspaceId, role } = await getAuthenticatedContext();

  if (!["ADMIN", "MANAGER"].includes(role)) {
    throw new Error("Access Denied");
  }

  try {
    await prisma.$transaction(async (tx) => {
      const existingClient = await tx.client.findFirst({
        where: { id, workspaceId },
        select: { id: true, name: true },
      });

      if (!existingClient) {
        throw new Error("Access Denied");
      }

      await tx.client.delete({
        where: { id: existingClient.id },
      });

      await tx.auditLog.create({
        data: {
          action: `Eliminou cliente: ${existingClient.name}`,
          userId,
        },
      });
    });

    revalidatePath("/dashboard/clientes");
  } catch {
    throw new Error("Failed to delete client");
  }
}
