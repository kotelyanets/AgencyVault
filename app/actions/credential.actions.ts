"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { encrypt, decrypt } from "@/lib/encryption";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getAuthenticatedContext() {
  // Security check: derive tenant identity only from trusted server session.
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const workspaceId = session?.user?.workspaceId;

  if (!userId || !workspaceId) {
    throw new Error("Access Denied");
  }

  return { userId, workspaceId, role: session.user.role };
}

export async function addCredential(formData: FormData, clientId: string) {
  const { userId, workspaceId } = await getAuthenticatedContext();

  const platformName = (formData.get("platformName") as string | null)?.trim();
  const login = (formData.get("login") as string | null)?.trim();
  const rawPassword = (formData.get("password") as string | null) ?? "";

  if (!platformName || !login || !rawPassword || !clientId) {
    throw new Error("Failed to process credential");
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Security check: ensure target client belongs to current tenant before write.
      const ownedClient = await tx.client.findFirst({
        where: { id: clientId, workspaceId },
        select: { id: true },
      });

      if (!ownedClient) {
        throw new Error("Access Denied");
      }

      const encryptedPassword = encrypt(rawPassword);

      const credential = await tx.credential.create({
        data: {
          platformName,
          login,
          encryptedPassword,
          clientId: ownedClient.id,
        },
      });

      await tx.auditLog.create({
        data: {
          action: `Criou credencial: ${platformName}`,
          userId,
          credentialId: credential.id,
        },
      });
    });

    revalidatePath(`/dashboard/clientes/${clientId}`);
  } catch {
    throw new Error("Failed to process credential");
  }
}

export async function revealPassword(credentialId: string) {
  const { userId, workspaceId } = await getAuthenticatedContext();

  if (!credentialId) {
    throw new Error("Access Denied");
  }

  try {
    const encryptedPassword = await prisma.$transaction(async (tx) => {
      // Security check: deep ownership validation blocks cross-tenant IDOR access.
      const credential = await tx.credential.findFirst({
        where: {
          id: credentialId,
          client: { workspaceId },
        },
        select: {
          id: true,
          platformName: true,
          encryptedPassword: true,
        },
      });

      if (!credential) {
        throw new Error("Access Denied");
      }

      await tx.auditLog.create({
        data: {
          action: `Visualizou credencial: ${credential.platformName}`,
          userId,
          credentialId: credential.id,
        },
      });

      return credential.encryptedPassword;
    });

    // Security check: decrypt only after ownership validation has passed.
    return decrypt(encryptedPassword);
  } catch {
    throw new Error("Access Denied");
  }
}

export async function deleteCredential(credentialId: string) {
  const { userId, workspaceId } = await getAuthenticatedContext();

  if (!credentialId) {
    throw new Error("Access Denied");
  }

  try {
    const deletedCredential = await prisma.$transaction(async (tx) => {
      // Security check: deep ownership validation for delete prevents BOLA/IDOR.
      const credential = await tx.credential.findFirst({
        where: {
          id: credentialId,
          client: { workspaceId },
        },
        select: {
          id: true,
          platformName: true,
          clientId: true,
        },
      });

      if (!credential) {
        throw new Error("Access Denied");
      }

      await tx.credential.delete({
        where: { id: credential.id },
      });

      await tx.auditLog.create({
        data: {
          action: `Eliminou credencial: ${credential.platformName}`,
          userId,
          credentialId: credential.id,
        },
      });

      return credential;
    });

    revalidatePath(`/dashboard/clientes/${deletedCredential.clientId}`);
  } catch {
    throw new Error("Failed to process credential");
  }
}
