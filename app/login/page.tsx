"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, ArrowLeft, Loader2, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credenciais inválidas. Tente novamente.");
      setIsLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute top-8 left-8 z-20"
      >
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-all text-sm font-semibold group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Voltar à página inicial
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative group">
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500 opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="p-10">
            <div className="flex flex-col items-center mb-10">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-inner"
              >
                <Shield className="h-8 w-8 text-indigo-400" />
              </motion.div>
              <h1 className="text-3xl font-bold text-white tracking-tight">AgencyVault</h1>
              <p className="text-slate-400 text-sm mt-2 font-medium">Aceda ao seu cofre digital seguro</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 text-sm font-semibold ml-1 uppercase tracking-wider">Email</Label>
                <div className="relative group/input">
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@agencyvault.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    disabled={isLoading}
                    className="bg-black/20 border-slate-800 h-12 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all rounded-xl"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-slate-300 text-sm font-semibold uppercase tracking-wider">Password</Label>
                  <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-semibold">
                    Recuperar acesso?
                  </a>
                </div>
                <div className="relative group/input">
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    disabled={isLoading}
                    className="bg-black/20 border-slate-800 h-12 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all rounded-xl"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-xl text-base font-bold shadow-lg shadow-indigo-500/10 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>A verificar...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Entrar no Cofre</span>
                  </>
                )}
              </Button>
            </form>
          </div>
          
          <div className="border-t border-slate-800/50 bg-black/20 p-6 text-center">
            <p className="text-xs text-slate-500 font-medium tracking-wide">
              AINDA NÃO TEM CONTA? <a href="#" className="text-indigo-400 hover:text-indigo-300 font-bold ml-1 transition-colors">CONTACTE O SUPORTE</a>
            </p>
          </div>
        </div>
        
        <p className="mt-8 text-center text-slate-600 text-xs font-medium uppercase tracking-[0.2em]">
          AgencyVault &bull; 256-bit AES Security
        </p>
      </motion.div>
    </div>
  );
}
