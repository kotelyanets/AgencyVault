import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

import { SettingsForms } from "./SettingsForms";

export default async function ConfiguracoesPage() {
  const session = await getServerSession(authOptions);
  const workspaceId = session?.user?.workspaceId;

  const workspace = workspaceId
    ? await prisma.workspace.findUnique({
        where: { id: workspaceId },
        select: { name: true },
      })
    : null;

  const canEditWorkspace = session?.user?.role === "ADMIN";

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Configurações</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Ajuste as preferências da sua conta e da agência.
        </p>
      </div>

      <SettingsForms workspaceName={workspace?.name ?? ""} canEditWorkspace={canEditWorkspace} />
    </div>
  );
}
