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
      },
      create: {
        email: 'admin@agencyvault.com',
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN',
        workspaceId: workspace.id,
      }
    });

    return NextResponse.json({ message: "Seed successful", user: user.email });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Seed failed", details: error.message }, { status: 500 });
  }
}
