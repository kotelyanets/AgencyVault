import PricingCard from "@/components/ui/pricing-card";

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 py-16 px-4 sm:px-8">
      <div className="max-w-3xl text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Planos ajustados ao seu <span className="text-indigo-500">Gabinete</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Seja um contabilista independente ou uma grande agência, temos o cofre digital ideal para a sua segurança.
          </p>
      </div>
      
      <PricingCard />
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
        <div className="text-center p-4">
          <div className="text-indigo-500 font-bold text-xl mb-1">Backup Diário</div>
          <p className="text-sm text-slate-500">Os seus dados estão seguros com backups redundantes automáticos.</p>
        </div>
        <div className="text-center p-4">
          <div className="text-indigo-500 font-bold text-xl mb-1">Zero-Knowledge</div>
          <p className="text-sm text-slate-500">Nós nunca temos acesso às suas passwords descodificadas.</p>
        </div>
        <div className="text-center p-4">
          <div className="text-indigo-500 font-bold text-xl mb-1">RGPD Compliant</div>
          <p className="text-sm text-slate-500">Total conformidade com o regulamento de proteção de dados.</p>
        </div>
      </div>
    </div>
  );
}
