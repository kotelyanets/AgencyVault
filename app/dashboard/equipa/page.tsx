import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AddTeamMemberDialog } from "./AddTeamMemberDialog";

const CAN_MANAGE_ROLES: Role[] = [Role.ADMIN, Role.MANAGER];

export default async function EquipaPage() {
  const session = await getServerSession(authOptions);
  const workspaceId = session?.user?.workspaceId;
  const currentRole = session?.user?.role;

  const users = workspaceId
    ? await prisma.user.findMany({
        where: { workspaceId },
        orderBy: [{ role: "asc" }, { name: "asc" }],
      })
    : [];

  const canAddMember = currentRole ? CAN_MANAGE_ROLES.includes(currentRole) : false;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Gestão de Equipa</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gerencie os membros da sua workspace e funções de acesso.</p>
        </div>
        {canAddMember && <AddTeamMemberDialog />}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 dark:bg-slate-900/50">
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Função</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-slate-500">
                  Nenhum membro encontrado para esta workspace.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} className="border-slate-200 dark:border-slate-800">
                  <TableCell className="font-medium text-slate-900 dark:text-slate-100">{user.name || "Sem nome"}</TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400">{user.email}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/50">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-slate-400">—</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
