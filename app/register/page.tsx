import Link from "next/link";
import { ArrowLeft, Shield, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "./actions";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="absolute top-8 left-8 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-all text-sm font-semibold group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Voltar à página inicial
        </Link>
      </div>

      <Card className="relative w-full max-w-xl z-10 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500 opacity-70" />
        <CardHeader className="items-center text-center p-10 pb-6">
          <div className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner mb-5">
            <Shield className="h-8 w-8 text-indigo-400" />
          </div>
          <CardTitle className="text-3xl font-bold text-white tracking-tight">Criar Conta</CardTitle>
          <CardDescription className="text-slate-400 text-sm mt-2 font-medium">
            Registe a sua agência e comece a proteger credenciais com o AgencyVault.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-10 pb-10">
          <form action={registerUser} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300 text-sm font-semibold ml-1 uppercase tracking-wider">
                Nome
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="João Silva"
                required
                className="bg-black/20 border-slate-800 h-12 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 text-sm font-semibold ml-1 uppercase tracking-wider">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@agencia.pt"
                required
                className="bg-black/20 border-slate-800 h-12 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-slate-300 text-sm font-semibold ml-1 uppercase tracking-wider"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                className="bg-black/20 border-slate-800 h-12 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="workspaceName"
                className="text-slate-300 text-sm font-semibold ml-1 uppercase tracking-wider"
              >
                Nome da Agência
              </Label>
              <Input
                id="workspaceName"
                name="workspaceName"
                type="text"
                placeholder="Agência Exemplo Lda."
                required
                className="bg-black/20 border-slate-800 h-12 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all rounded-xl"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-xl text-base font-bold shadow-lg shadow-indigo-500/10 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <UserPlus className="h-4 w-4" />
              Registar Agência
            </Button>
          </form>
        </CardContent>

        <div className="border-t border-slate-800/50 bg-black/20 p-6 text-center">
          <p className="text-xs text-slate-500 font-medium tracking-wide">
            JÁ TEM CONTA?
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-bold ml-1 transition-colors">
              ENTRAR
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
