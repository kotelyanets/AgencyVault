import Link from 'next/link';
import { Users, Shield, Briefcase, Activity, Settings, LogOut, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400">
            <Shield className="h-6 w-6" />
            AgencyVault
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard/clientes" className="flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
            <Users className="h-5 w-5" />
            Clientes
          </Link>
          <Link href="/dashboard/cofre" className="flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
            <Shield className="h-5 w-5" />
            Cofre
          </Link>
          <Link href="/dashboard/equipa" className="flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
            <Briefcase className="h-5 w-5" />
            Equipa
          </Link>
          <Link href="/dashboard/auditoria" className="flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
            <Activity className="h-5 w-5" />
            Auditoria
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
            <Settings className="h-4 w-4" />
            Configurações
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors text-sm font-medium rounded-md mt-1">
            <LogOut className="h-4 w-4" />
            Terminar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content Component */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800">
              G
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">Gabinete Contabilidade Silva</span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium border border-indigo-100 dark:border-indigo-800/50">
              Pro Plan
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                type="search" 
                placeholder="Pesquisar..." 
                className="w-64 pl-9 bg-slate-100 dark:bg-slate-800 border-none focus-visible:ring-1 focus-visible:ring-indigo-500 rounded-full h-9"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-900"></span>
            </Button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-800">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-medium text-slate-900 dark:text-white leading-none">Admin</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">admin@silva.pt</span>
              </div>
              <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 overflow-hidden flex-shrink-0">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
