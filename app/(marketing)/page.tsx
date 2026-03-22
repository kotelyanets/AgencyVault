import { ArrowRight, ShieldCheck, Lock, Users } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section with Sparkles */}
      <section className="relative w-full h-[35rem] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full absolute inset-0 h-full">
          <SparklesCore
            id="tsparticleshero"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#3b82f6"
            speed={1}
          />
        </div>

        <div className="relative z-20 flex flex-col items-center px-4 text-center">
          <div className="mb-8 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
            Sprint 1: Security Foundation Ready
          </div>
          
          <h1 className="max-w-5xl text-5xl font-extrabold tracking-tight sm:text-7xl mb-6 text-white">
            O Cofre Digital Seguro <br className="hidden sm:inline" /> para Profissionais.
          </h1>
          
          <p className="max-w-2xl text-lg text-slate-400 mb-10">
            O AgencyVault foi criado especificamente para gabinetes de contabilidade e agências gerirem, partilharem e monitorizarem as passwords dos clientes com total segurança.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register">
              <button className="inline-flex w-full sm:w-auto h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700">
                Começar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
            <Link href="#">
              <button className="inline-flex w-full sm:w-auto h-12 items-center justify-center rounded-md border border-slate-800 bg-slate-950 px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300">
                Marcar Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="container mx-auto py-24 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full text-left">
          <div className="flex flex-col items-start p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm transition-all hover:shadow-md hover:border-blue-500/30">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4 text-blue-600 dark:text-blue-400">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Segurança de Nível Bancário</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Criptografia de nível militar para todas as credenciais. Total tranquilidade para si e para os seus clientes.</p>
          </div>
          
          <div className="flex flex-col items-start p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm transition-all hover:shadow-md hover:border-blue-500/30">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4 text-blue-600 dark:text-blue-400">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Gestão Multi-Cliente</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Organize as passwords por cliente (AT, SS, etc). Atribua acessos à sua equipa instantaneamente.</p>
          </div>

          <div className="flex flex-col items-start p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm transition-all hover:shadow-md hover:border-blue-500/30">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4 text-blue-600 dark:text-blue-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Registo de Auditoria</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Saiba sempre quem acedeu, viu ou copiou uma password. Mantenha o controlo total.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
