import { ArrowRight, ShieldCheck, Lock, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center">
      <div className="mb-8 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
        <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
        Sprint 1 Foundation Ready
      </div>
      
      <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-400 dark:to-white">
        The Secure Credential Manager <br className="hidden sm:inline" /> for Professionals
      </h1>
      
      <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400 mb-10">
        AgencyVault is purpose-built for accounting and marketing agencies to securely manage, share, and track client passwords across multi-tenant workspaces.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-20">
        <button className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50">
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
        <button className="inline-flex h-12 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300">
          Book a Demo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full text-left">
        <div className="flex flex-col items-start p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4 text-blue-600 dark:text-blue-400">
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Vault-Level Security</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Military-grade encryption for all client credentials. Complete peace of mind for you and your clients.</p>
        </div>
        
        <div className="flex flex-col items-start p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4 text-blue-600 dark:text-blue-400">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Multi-Tenant Workspaces</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Organize passwords by client. Assign role-based access to your team members instantly.</p>
        </div>

        <div className="flex flex-col items-start p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4 text-blue-600 dark:text-blue-400">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Detailed Audit Logs</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Track every login, view, and edit. Maintain compliance with comprehensive activity monitoring.</p>
        </div>
      </div>
    </div>
  );
}
