import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    let workspace = await prisma.workspace.findFirst({
      where: { name: 'Gabinete Contabilidade Silva' }
    });

    if (!workspace) {
      workspace = await prisma.workspace.create({
        data: { name: 'Gabinete Contabilidade Silva' }
      });
    }

    const hashedPassword = await bcrypt.hash("password123", 10);

    const user = await prisma.user.upsert({
      where: { email: 'admin@agencyvault.com' },
      update: {
        password: hashedPassword,
        workspaceId: workspace.id,
        isSuperAdmin: true,
      },
      create: {
        email: 'admin@agencyvault.com',
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN',
        isSuperAdmin: true,
        workspaceId: workspace.id,
      }
    });

    let client = await prisma.client.findFirst({
      where: {
        workspaceId: workspace.id,
        name: "Cliente Demo",
      },
    });

    if (!client) {
      client = await prisma.client.create({
        data: {
          name: "Cliente Demo",
          workspaceId: workspace.id,
        },
      });
    }

    let credential = await prisma.credential.findFirst({
      where: {
        clientId: client.id,
        platformName: "Gmail",
        login: "demo@cliente.com",
      },
    });

    if (!credential) {
      credential = await prisma.credential.create({
        data: {
          platformName: "Gmail",
          login: "demo@cliente.com",
          encryptedPassword: "seeded-password",
          clientId: client.id,
        },
      });
    }

    const existingAuditLogs = await prisma.auditLog.count({
      where: { userId: user.id },
    });

    if (existingAuditLogs === 0) {
      await prisma.auditLog.createMany({
        data: [
          {
            action: "CREATE_CLIENT",
            userId: user.id,
          },
          {
            action: "CREATE_CREDENTIAL",
            userId: user.id,
            credentialId: credential.id,
          },
          {
            action: "VIEW_PASSWORD",
            userId: user.id,
            credentialId: credential.id,
          },
        ],
      });
    }

    return NextResponse.json({ message: "Seed successful", user: user.email });
  } catch (error: unknown) {
    console.error("Seed error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Seed failed", details: errorMessage }, { status: 500 });
  }
}
