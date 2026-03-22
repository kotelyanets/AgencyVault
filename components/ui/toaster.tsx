"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg border p-4 shadow-md ${
            toast.variant === "destructive"
              ? "border-red-200 bg-red-50 text-red-900 dark:border-red-800/50 dark:bg-red-950/70 dark:text-red-200"
              : "border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              {toast.title && <p className="text-sm font-semibold">{toast.title}</p>}
              {toast.description && <p className="text-sm opacity-90">{toast.description}</p>}
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-6 w-6 rounded-md opacity-70 hover:opacity-100"
              onClick={() => dismiss(toast.id)}
            >
              <X className="h-3.5 w-3.5" />
              <span className="sr-only">Fechar</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
