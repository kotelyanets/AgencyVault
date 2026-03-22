"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Briefcase, Settings, Shield, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { LogoutButton } from "./LogoutButton";

const navItems = [
  { href: "/dashboard/clientes", label: "Clientes", icon: Users },
  { href: "/dashboard/cofre", label: "Cofre", icon: Shield },
  { href: "/dashboard/equipa", label: "Equipa", icon: Briefcase },
  { href: "/dashboard/auditoria", label: "Auditoria", icon: Activity },
  { href: "/dashboard/configuracoes", label: "Configurações", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <LogoutButton />
      </div>
    </>
  );
}
