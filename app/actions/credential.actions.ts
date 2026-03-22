"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { encrypt, decrypt } from "@/lib/encryption";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function addCredential(formData: FormData, clientId: string) {
  const platformName = formData.get("platformName") as string;
  const login = formData.get("login") as string;
  const rawPassword = formData.get("password") as string;

  if (!platformName || !login || !rawPassword || !clientId) return;

  const encryptedPassword = encrypt(rawPassword);

  const credential = await prisma.credential.create({
    data: {
      platformName,
      login,
      encryptedPassword,
      clientId,
    }
  });

  const session = await getServerSession(authOptions);
  if (session?.user) {
    await prisma.auditLog.create({
      data: {
        action: `Criou credencial: ${platformName}`,
        userId: session.user.id,
        credentialId: credential.id,
      }
    });
  }

  revalidatePath(`/dashboard/clientes/${clientId}`);
}

export async function revealPassword(credentialId: string) {
  const credential = await prisma.credential.findUnique({
    where: { id: credentialId }
  });

  if (!credential) throw new Error("Credential not found");

  const decrypted = decrypt(credential.encryptedPassword);

  const session = await getServerSession(authOptions);
  if (session?.user) {
    await prisma.auditLog.create({
      data: {
        action: `Visualizou password: ${credential.platformName}`,
        userId: session.user.id,
        credentialId: credential.id,
      }
    });
  }
  
  return decrypted;
}
