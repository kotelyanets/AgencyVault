"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type HeaderBarProps = {
  name?: string | null;
  email?: string | null;
  workspaceName?: string | null;
};

export function HeaderBar({ name, email, workspaceName }: HeaderBarProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearchSubmit = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    router.push(`/dashboard/clientes?q=${encodeURIComponent(trimmed)}`);
    setIsCommandOpen(false);
  };

  const displayName = name || "Admin";
  const displayEmail = email || "admin@silva.pt";
  const displayWorkspaceName = workspaceName || "Workspace";

  return (
    <>
      <header className="h-16 flex items-center justify-between px-8 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800">
            {displayWorkspaceName.substring(0, 1).toUpperCase()}
          </div>
          <span className="font-semibold text-slate-900 dark:text-white">
            {displayWorkspaceName}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium border border-indigo-100 dark:border-indigo-800/50">
            Pro Plan
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setIsCommandOpen(true)}
            className="relative hidden md:block"
            aria-label="Abrir pesquisa global"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              readOnly
              placeholder="Pesquisar..."
              className="w-64 pl-9 bg-slate-100 dark:bg-slate-800 border-none focus-visible:ring-1 focus-visible:ring-indigo-500 rounded-full h-9 cursor-pointer"
            />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-900"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <div className="px-2 py-4 text-sm text-slate-600 dark:text-slate-300 text-center">
                Não há novas notificações.
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-800"
              >
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-sm font-medium text-slate-900 dark:text-white leading-none">
                    {displayName}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {displayEmail}
                  </span>
                </div>
                <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 overflow-hidden flex-shrink-0">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`}
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem onClick={() => router.push("/dashboard/configuracoes")}>
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Dialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Pesquisar</DialogTitle>
            <DialogDescription>
              Procure rapidamente por clientes no sistema.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSearchSubmit(searchTerm);
            }}
            className="space-y-3"
          >
            <Input
              autoFocus
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Pesquisar clientes..."
              className="h-10"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pressione Enter para abrir os resultados em Clientes.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
