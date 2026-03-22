import { prisma } from "@/lib/prisma";
import { AddClientDialog } from "./AddClientDialog";
import { ClientTable } from "./ClientTable";

export default async function ClientesPage() {
  const clients = await prisma.client.findMany({
    include: {
      credentials: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Gestão de Clientes</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gerencie os seus clientes e aceda aos seus cofres de senhas.</p>
        </div>
        
        <AddClientDialog />
      </div>

      <ClientTable clients={clients} />
    </div>
  );
}
