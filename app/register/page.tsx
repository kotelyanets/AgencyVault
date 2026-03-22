"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowLeft, Shield } from "lucide-react";

import { registerWorkspaceAdmin } from "@/app/actions/register.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As passwords não coincidem.");
      return;
    }

    setIsLoading(true);

    const result = await registerWorkspaceAdmin({
      workspaceName,
      name,
      email,
      password,
    });

    if (!result.success) {
      setError(result.error ?? "Não foi possível criar a conta.");
      setIsLoading(false);
      return;
    }

    const loginResult = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    if (loginResult?.error) {
      setError("Conta criada, mas não foi possível iniciar sessão automaticamente.");
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          Voltar à página inicial
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

          <div className="p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="h-12 w-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 border border-indigo-500/20">
                <Shield className="h-6 w-6 text-indigo-400" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">AgencyVault</h1>
              <p className="text-slate-400 text-sm mt-1">Crie a sua conta e workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="workspaceName" className="text-slate-300">Nome da Empresa</Label>
                <Input
                  id="workspaceName"
                  type="text"
                  placeholder="Finanças Plus"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">Seu Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="João Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="boss@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={isLoading}
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-300">Confirmar Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={isLoading}
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11"
              >
                {isLoading ? "A criar conta..." : "Criar Conta"}
              </Button>
            </form>
          </div>

          <div className="border-t border-slate-800 bg-slate-950/50 p-4 text-center">
            <p className="text-xs text-slate-500">
              Já tem conta?{" "}
              <Link href="/login" className="text-indigo-400 hover:underline">
                Entrar no Cofre
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
