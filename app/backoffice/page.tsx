import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";

export default async function BackofficePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isSuperAdmin) {
    redirect("/dashboard");
  }

  const workspaces = await prisma.workspace.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          users: true,
          clients: true,
        },
      },
    },
  });

  const totalAgencies = workspaces.length;
  const totalActiveSubscriptions = workspaces.filter(
    (workspace) => workspace.subscriptionStatus === "ACTIVE"
  ).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Backoffice
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Visão geral das agências e respectivas subscrições.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Agencies</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">{totalAgencies}</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Active Subscriptions</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">
            {totalActiveSubscriptions}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 dark:bg-slate-900/50">
              <TableHead>Agência</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Utilizadores</TableHead>
              <TableHead>Clientes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workspaces.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-slate-500">
                  Nenhuma agência encontrada.
                </TableCell>
              </TableRow>
            ) : (
              workspaces.map((workspace) => (
                <TableRow key={workspace.id} className="border-slate-200 dark:border-slate-800">
                  <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                    {workspace.name}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300">
                    {workspace.plan}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300">
                    {workspace.subscriptionStatus}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300">
                    {workspace._count.users}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300">
                    {workspace._count.clients}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
