"use client";

import * as React from "react";

type Toast = {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 3000;

type State = {
  toasts: Toast[];
};

const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(state: State) {
  memoryState = state;
  listeners.forEach((listener) => listener(memoryState));
}

function removeToast(id: string) {
  dispatch({
    toasts: memoryState.toasts.filter((toast) => toast.id !== id),
  });
}

function dismiss(id: string) {
  removeToast(id);
}

export function toast({
  title,
  description,
  variant = "default",
}: Omit<Toast, "id">) {
  const id = crypto.randomUUID();

  dispatch({
    toasts: [{ id, title, description, variant }, ...memoryState.toasts].slice(0, TOAST_LIMIT),
  });

  setTimeout(() => removeToast(id), TOAST_REMOVE_DELAY);
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss,
  };
}
