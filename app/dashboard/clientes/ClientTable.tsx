"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MoreHorizontal, Lock, Key, Pencil, ChevronDown, Users, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { updateClient, deleteClient } from "@/app/actions/client.actions";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface ClientData {
  id: string;
  name: string;
  nif: string | null;
  credentials: { id: string }[];
}

export function ClientTable({ clients }: { clients: ClientData[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingClient, setEditingClient] = useState<ClientData | null>(null);
  const [deletingClient, setDeletingClient] = useState<ClientData | null>(null);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);
  const { toast } = useToast();

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredClients = clients.filter((client) => {
    if (!normalizedQuery) return true;
    return (
      client.name.toLowerCase().includes(normalizedQuery) ||
      (client.nif?.toLowerCase().includes(normalizedQuery) ?? false)
    );
  });

  async function onEditSubmit(formData: FormData) {
    if (!editingClient) return;

    try {
      setIsSubmittingEdit(true);
      await updateClient(editingClient.id, formData);
      toast({
        title: "Cliente atualizado",
        description: "As alterações foram guardadas com sucesso.",
      });
      setEditingClient(null);
    } catch (error) {
      toast({
        title: "Erro ao atualizar cliente",
        description: error instanceof Error ? error.message : "Não foi possível atualizar o cliente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingEdit(false);
    }
  }

  async function onDeleteConfirm() {
    if (!deletingClient) return;

    try {
      setIsSubmittingDelete(true);
      await deleteClient(deletingClient.id);
      toast({
        title: "Cliente eliminado",
        description: "O cliente foi removido com sucesso.",
      });
      setDeletingClient(null);
    } catch (error) {
      toast({
        title: "Erro ao eliminar cliente",
        description: error instanceof Error ? error.message : "Não foi possível eliminar o cliente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingDelete(false);
    }
  }

  return (
    <>
      <Toaster />
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Pesquisar por nome ou NIF..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
            />
          </div>
          <Button variant="outline" className="gap-2 hidden sm:flex text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800">
            Filtros
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-800">
                <TableHead className="w-[300px]">Nome do Cliente</TableHead>
                <TableHead>NIF</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Credenciais Ativas</TableHead>
                <TableHead className="w-[100px] text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id} className="border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-100 dark:border-indigo-800/50 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                        {client.name.substring(0, 1).toUpperCase()}
                      </div>
                      {client.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400 font-mono text-sm">{client.nif || "N/A"}</TableCell>
                  <TableCell>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30">
                      Ativo
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                      <Key className="h-3.5 w-3.5 text-slate-400" />
                      {client.credentials.length}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <Link href={`/dashboard/clientes/${client.id}`}>
                            <Lock className="mr-2 h-4 w-4 text-indigo-500" />
                            <span>Ver Cofre</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onSelect={(event) => {
                            event.preventDefault();
                            setEditingClient(client);
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Editar Cliente</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                          onSelect={(event) => {
                            event.preventDefault();
                            setDeletingClient(client);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Eliminar Cliente</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredClients.length === 0 && (
            <div className="py-12 text-center">
              <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">Nenhum cliente encontrado</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                {searchQuery ? "Nenhum resultado corresponde à sua pesquisa." : "Comece por adicionar um novo cliente para gerir as suas credenciais."}
              </p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={Boolean(editingClient)} onOpenChange={(open) => !open && setEditingClient(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <form action={onEditSubmit}>
            <DialogHeader>
              <DialogTitle>Editar Cliente</DialogTitle>
              <DialogDescription>Atualize o nome e o NIF do cliente.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nome da Empresa</Label>
                <Input id="edit-name" name="name" defaultValue={editingClient?.name ?? ""} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-nif">NIF</Label>
                <Input id="edit-nif" name="nif" defaultValue={editingClient?.nif ?? ""} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setEditingClient(null)} disabled={isSubmittingEdit}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isSubmittingEdit}>
                {isSubmittingEdit ? "A Guardar..." : "Guardar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(deletingClient)} onOpenChange={(open) => !open && setDeletingClient(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Cliente</AlertDialogTitle>
            <AlertDialogDescription>
              Tem a certeza que pretende eliminar{" "}
              <span className="font-semibold text-foreground">{deletingClient?.name}</span>? Esta ação é permanente e remove também as credenciais associadas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmittingDelete}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                await onDeleteConfirm();
              }}
              className="bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400/50"
              disabled={isSubmittingDelete}
            >
              {isSubmittingDelete ? "A Eliminar..." : "Eliminar Cliente"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
