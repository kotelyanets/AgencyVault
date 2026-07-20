"use client";

import { useState } from "react";
import { Check, Copy, Plus } from "lucide-react";

import { addTeamMember } from "@/app/actions/user.actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

export function AddTeamMemberDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [temporaryPassword, setTemporaryPassword] = useState<string | null>(null);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function onSubmit(formData: FormData) {
    try {
      setIsPending(true);
      const result = await addTeamMember(formData);
      setOpen(false);
      setTemporaryPassword(result.temporaryPassword);
      setIsPasswordDialogOpen(true);
    } catch (submissionError) {
      toast({
        variant: "destructive",
        description: submissionError instanceof Error ? submissionError.message : "Não foi possível adicionar o membro.",
      });
    } finally {
      setIsPending(false);
    }
  }

  async function onCopyPassword() {
    if (!temporaryPassword) return;

    try {
      await navigator.clipboard.writeText(temporaryPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (copyError) {
      toast({
        variant: "destructive",
        description: copyError instanceof Error ? copyError.message : "Não foi possível copiar a password temporária.",
      });
    }
  }

  return (
    <>
      <Toaster />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Membro
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form action={onSubmit}>
            <DialogHeader>
              <DialogTitle>Novo Membro</DialogTitle>
              <DialogDescription>
                Adicione um membro à sua equipa e defina a respetiva função.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" placeholder="Ex: Ana Santos" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Ex: ana@empresa.pt" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Função</Label>
                <select
                  id="role"
                  name="role"
                  required
                  defaultValue="MEMBER"
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="MANAGER">Manager</option>
                  <option value="MEMBER">Member</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setOpen(false)} disabled={isPending}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                {isPending ? "A Guardar..." : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isPasswordDialogOpen}
        onOpenChange={(nextOpen) => {
          setIsPasswordDialogOpen(nextOpen);
          if (!nextOpen) {
            setTemporaryPassword(null);
            setCopied(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Password temporária gerada</DialogTitle>
            <DialogDescription>
              Copie esta password agora e partilhe com o membro. Ela só é mostrada uma vez.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-2 font-mono text-sm break-all">
            {temporaryPassword}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
              Fechar
            </Button>
            <Button type="button" onClick={onCopyPassword} className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copiado" : "Copiar Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
