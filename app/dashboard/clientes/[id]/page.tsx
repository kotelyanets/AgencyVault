import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AddCredentialDialog } from "./AddCredentialDialog";
import { CredentialTable } from "./CredentialTable";

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = await prisma.client.findUnique({
    where: { id: params.id },
    include: {
      credentials: {
        orderBy: { platformName: 'asc' }
      }
    }
  });

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
        <Link href="/dashboard/clientes" className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Voltar a Clientes
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg border border-indigo-100 dark:border-indigo-800/50">
              {client.name.substring(0, 1).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{client.name}</h1>
              <p className="text-slate-500 dark:text-slate-400 font-mono text-sm mt-0.5">NIF: {client.nif || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        <AddCredentialDialog clientId={client.id} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
          <Shield className="h-5 w-5 text-indigo-500" />
          Credenciais do Cofre
        </h2>
        
        <CredentialTable credentials={client.credentials} />
      </div>
    </div>
  );
}
