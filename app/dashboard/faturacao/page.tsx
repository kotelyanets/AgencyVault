import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CheckCircle2, CreditCard, Sparkles } from "lucide-react";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { UpgradeButton } from "./UpgradeButton";

export default async function BillingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.workspaceId) {
    redirect("/login");
  }

  const workspace = await prisma.workspace.findUnique({
    where: { id: session.user.workspaceId },
    select: {
      name: true,
      plan: true,
      subscriptionStatus: true,
    },
  });

  const plan = workspace?.plan ?? "TRIAL";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Faturação</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Gerir o plano da sua agência e ativar recursos premium.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <CreditCard className="h-3.5 w-3.5" />
              Plano Atual
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{plan}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Workspace: <span className="font-semibold text-slate-700 dark:text-slate-200">{workspace?.name}</span>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Estado da subscrição:{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {workspace?.subscriptionStatus ?? "ACTIVE"}
              </span>
            </p>
          </div>

          {plan === "PRO" ? (
            <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="h-5 w-5" />
              Plano Pro ativo
            </div>
          ) : (
            <UpgradeButton />
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          Benefícios do Plano Pro
        </h3>
        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Gestão de clientes e credenciais sem limites.
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Auditoria avançada para rastreabilidade total.
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Prioridade no suporte e futuras integrações premium.
          </li>
        </ul>
      </section>
    </div>
  );
}
