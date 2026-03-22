import { Shield } from "lucide-react";
import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900 text-slate-50">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Shield className="h-6 w-6 text-blue-500" />
            <span>AgencyVault</span>
          </div>
          <nav className="ml-auto flex items-center gap-6 text-sm font-medium">
            <a href="#" className="hover:text-blue-400 transition-colors">Features</a>
            <Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-blue-400 transition-colors">Login</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
