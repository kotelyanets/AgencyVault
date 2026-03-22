"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createClient(formData: FormData) {
  const name = formData.get("name") as string;
  const nif = formData.get("nif") as string;

  if (!name) return;

  // 1. Ensure a Workspace Exists (Seed)
  let workspace = await prisma.workspace.findFirst();
  if (!workspace) {
    workspace = await prisma.workspace.create({
      data: { name: 'Gabinete Contabilidade Silva' }
    });
  }

  // 2. Insert the new client
  const client = await prisma.client.create({
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
        userId: (session.user as any).id,
      }
    });
  }

  // 3. Revalidate path so the table updates instantly
  revalidatePath("/dashboard/clientes");
}
