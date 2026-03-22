import { prisma } from "@/lib/prisma";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { History, User as UserIcon, Shield } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

export default async function AuditoriaPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      credential: {
        include: {
          client: true
        }
      }
    },
    take: 50,
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Registo de Auditoria</h1>
        <p className="text-slate-500 dark:text-slate-400">Histórico completo de acessos e modificações de segurança.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 dark:bg-slate-900/50">
              <TableHead className="w-[200px]">Data e Hora</TableHead>
              <TableHead>Utilizador</TableHead>
              <TableHead>Ação</TableHead>
              <TableHead>Recurso</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-slate-500">
                  Nenhum registo de atividade encontrado.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id} className="border-slate-200 dark:border-slate-800">
                  <TableCell className="font-mono text-xs text-slate-500">
                    {format(log.createdAt, "dd MMM yyyy HH:mm:ss", { locale: pt })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <UserIcon className="h-3.5 w-3.5 text-slate-500" />
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {log.user.name || log.user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/50">
                      {log.action}
                    </span>
                  </TableCell>
                  <TableCell>
                    {log.credential ? (
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {log.credential.client.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          {log.credential.platformName}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
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
