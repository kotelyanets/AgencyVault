"use client";

import { useState } from "react";
import { Eye, EyeOff, Copy, Check } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { revealPassword } from "@/app/actions/credential.actions";

export function CredentialTable({ credentials }: { credentials: any[] }) {
  if (credentials.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">Sem credenciais</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Este cliente ainda não tem credenciais no cofre.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <TableHead className="w-[250px]">Plataforma</TableHead>
            <TableHead>Login</TableHead>
            <TableHead>Password</TableHead>
            <TableHead className="text-right w-[150px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {credentials.map((cred) => (
            <CredentialRow key={cred.id} credential={cred} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function CredentialRow({ credential }: { credential: any }) {
  const [password, setPassword] = useState("••••••••");
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleReveal = async () => {
    if (isRevealed) {
      setPassword("••••••••");
      setIsRevealed(false);
    } else {
      setIsLoading(true);
      try {
        const decrypted = await revealPassword(credential.id);
        setPassword(decrypted);
        setIsRevealed(true);
      } catch (error) {
        console.error("Failed to decrypt", error);
        setPassword("Erro ao decifrar");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCopy = () => {
    if (isRevealed && password !== "••••••••") {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
      <TableCell className="font-medium text-slate-900 dark:text-slate-100">
        {credential.platformName}
      </TableCell>
      <TableCell className="text-slate-600 dark:text-slate-300 font-mono text-sm">
        {credential.login}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm text-slate-700 dark:text-slate-300 select-none min-w-[80px] inline-block font-mono">
            {password}
          </code>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleReveal} 
            disabled={isLoading}
            className="h-8 w-8 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
            title={isRevealed ? "Ocultar Password" : "Ver Password"}
          >
            {isRevealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopy}
          disabled={!isRevealed || password === "••••••••"}
          className="gap-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-50"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          Copiar
        </Button>
      </TableCell>
    </TableRow>
  );
}
