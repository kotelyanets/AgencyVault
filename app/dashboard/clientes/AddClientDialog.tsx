"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/app/actions/client.actions";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

export function AddClientDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function onSubmit(formData: FormData) {
    try {
      setIsPending(true);
      await createClient(formData);
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        description: error instanceof Error ? error.message : "Não foi possível adicionar o cliente.",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      <Toaster />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Cliente
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form action={onSubmit}>
            <DialogHeader>
              <DialogTitle>Novo Cliente</DialogTitle>
              <DialogDescription>
                Adicione um novo cliente ao AgencyVault. Clique em guardar quando terminar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome da Empresa</Label>
                <Input id="name" name="name" placeholder="Ex: Auto Reparadora Lda" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nif">NIF (Número de Identificação Fiscal)</Label>
                <Input id="nif" name="nif" placeholder="Ex: 501234567" />
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
    </>
  );
}
