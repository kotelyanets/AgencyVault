import { prisma } from "@/lib/prisma";
import { 
  Users, 
  Shield, 
  Activity, 
  Plus, 
  ExternalLink 
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

export default async function DashboardPage() {
  const [clientCount, credentialCount, recentLogs] = await Promise.all([
    prisma.client.count(),
    prisma.credential.count(),
    prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
      },
      take: 5,
    })
  ]);

  const stats = [
    { 
      label: "Total de Clientes", 
      value: clientCount, 
      icon: Users, 
      color: "text-blue-600", 
      bg: "bg-blue-50 dark:bg-blue-900/20",
      href: "/dashboard/clientes"
    },
    { 
      label: "Credenciais no Cofre", 
      value: credentialCount, 
      icon: Shield, 
      color: "text-indigo-600", 
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      href: "/dashboard/clientes" // Or a global vault if we make one
    },
    { 
      label: "Atividades Recentes", 
      value: recentLogs.length, 
      icon: Activity, 
      color: "text-emerald-600", 
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      href: "/dashboard/auditoria"
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Bem-vindo ao AgencyVault</h1>
        <p className="text-slate-500 dark:text-slate-400">Resumo da segurança e atividade da sua agência.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link 
            key={stat.label} 
            href={stat.href}
            className="group p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:border-indigo-500/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <ExternalLink className="h-4 w-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
            </div>
            <div className="space-y-1">
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-indigo-500" />
              Atividade Recente
            </h2>
            <Link href="/dashboard/auditoria" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
              Ver tudo
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentLogs.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                Sem atividade registada.
              </div>
            ) : (
              recentLogs.map((log: any) => (
                <div key={log.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                      <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {log.action}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Por {log.user.name || log.user.email} • {format(log.createdAt, "HH:mm 'de' dd MMM", { locale: pt })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between relative overflow-hidden">
          
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Plus className="h-6 w-6 text-indigo-500" />
              Ações Rápidas
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs font-medium">Precisa de adicionar um novo cliente ou credencial ao sistema?</p>
            
            <div className="space-y-4">
              <Link href="/dashboard/clientes" className="block">
                <button className="w-full h-14 flex items-center justify-between px-6 bg-slate-900 hover:bg-black text-white rounded-xl transition-all group shadow-lg shadow-slate-900/20 active:scale-[0.98]">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5" />
                    <span className="font-bold tracking-tight">Gerir Clientes</span>
                  </div>
                  <ArrowRight className="h-4 w-4 transition-all translate-x-[-4px] group-hover:translate-x-0" />
                </button>
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug font-medium">
                Lembre-se: Todas as passwords são <span className="text-slate-900 dark:text-white font-bold underline decoration-indigo-500 underline-offset-4">encriptadas (AES-256-GCM)</span> antes de saírem do seu navegador.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function Lock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
