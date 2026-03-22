import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Shield } from "lucide-react";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AgencyVault",
  description: "The Secure Credential Manager for Professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 flex flex-col`}>
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900 text-slate-50">
          <div className="container mx-auto flex h-16 items-center px-4">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <Shield className="h-6 w-6 text-blue-500" />
              <span>AgencyVault</span>
            </div>
            <nav className="ml-auto flex items-center gap-6 text-sm font-medium">
              <a href="#" className="hover:text-blue-400 transition-colors">Features</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Pricing</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Login</a>
            </nav>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
