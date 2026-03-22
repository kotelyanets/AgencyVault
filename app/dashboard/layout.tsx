import Link from 'next/link';
import { Shield } from 'lucide-react';

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { SidebarNav } from "./SidebarNav";
import { HeaderBar } from "./HeaderBar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const workspaceName = session?.user?.workspaceId
    ? (
        await prisma.workspace.findUnique({
          where: { id: session.user.workspaceId },
          select: { name: true, plan: true },
        })
      )
    : null;
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity">
            <Shield className="h-6 w-6" />
            AgencyVault
          </Link>
        </div>
        <SidebarNav />
      </aside>

      {/* Main Content Component */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <HeaderBar
          name={session?.user?.name}
          email={session?.user?.email}
          workspaceName={workspaceName?.name}
          workspacePlan={workspaceName?.plan}
        />

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
