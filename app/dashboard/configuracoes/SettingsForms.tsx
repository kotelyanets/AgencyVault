"use client";

import { useRef, useState } from "react";

import { updateUserPassword, updateWorkspaceName } from "@/app/actions/settings.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

type SettingsFormsProps = {
  workspaceName: string;
  canEditWorkspace: boolean;
};

export function SettingsForms({ workspaceName, canEditWorkspace }: SettingsFormsProps) {
  const { toast } = useToast();
  const [isSavingWorkspace, setIsSavingWorkspace] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const passwordFormRef = useRef<HTMLFormElement>(null);

  async function onWorkspaceSubmit(formData: FormData) {
    try {
      setIsSavingWorkspace(true);
      await updateWorkspaceName(formData);
      toast({
        title: "Detalhes da agência atualizados",
        description: "O nome da agência foi guardado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao guardar agência",
        description:
          error instanceof Error
            ? error.message
            : "Não foi possível guardar os detalhes da agência.",
        variant: "destructive",
      });
    } finally {
      setIsSavingWorkspace(false);
    }
  }

  async function onPasswordSubmit(formData: FormData) {
    try {
      setIsSavingPassword(true);
      await updateUserPassword(formData);
      toast({
        title: "Password atualizada",
        description: "A sua password foi alterada com sucesso.",
      });
      passwordFormRef.current?.reset();
    } catch (error) {
      toast({
        title: "Erro ao atualizar password",
        description:
          error instanceof Error
            ? error.message
            : "Não foi possível atualizar a password.",
        variant: "destructive",
      });
    } finally {
      setIsSavingPassword(false);
    }
  }

  return (
    <>
      <Toaster />

      <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Detalhes da Agência</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Atualize o nome da sua workspace.
          </p>
        </div>

        <form action={onWorkspaceSubmit} className="space-y-4 max-w-xl">
          <div className="grid gap-2">
            <Label htmlFor="workspace-name">Nome da Agência</Label>
            <Input
              id="workspace-name"
              name="name"
              defaultValue={workspaceName}
              disabled={!canEditWorkspace || isSavingWorkspace}
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={!canEditWorkspace || isSavingWorkspace}
          >
            {isSavingWorkspace ? "A Guardar..." : "Guardar"}
          </Button>
          {!canEditWorkspace && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Apenas utilizadores ADMIN podem alterar o nome da agência.
            </p>
          )}
        </form>
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Segurança</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Defina uma nova password para a sua conta.
          </p>
        </div>

        <form ref={passwordFormRef} action={onPasswordSubmit} className="space-y-4 max-w-xl">
          <div className="grid gap-2">
            <Label htmlFor="new-password">Nova Password</Label>
            <Input
              id="new-password"
              name="newPassword"
              type="password"
              minLength={8}
              disabled={isSavingPassword}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirmar Password</Label>
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              minLength={8}
              disabled={isSavingPassword}
              required
            />
          </div>

          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isSavingPassword}>
            {isSavingPassword ? "A Atualizar..." : "Atualizar Password"}
          </Button>
        </form>
      </section>
    </>
  );
}
