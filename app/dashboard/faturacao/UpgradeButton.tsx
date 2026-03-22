"use client";

import { useState } from "react";
import { Loader2, Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";

export function UpgradeButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Não foi possível iniciar o checkout.");
      }

      const data = (await response.json()) as { url?: string };

      if (!data.url) {
        throw new Error("URL de checkout indisponível.");
      }

      window.location.href = data.url;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert("Falha ao iniciar upgrade. Tente novamente.");
    }
  };

  return (
    <Button
      type="button"
      onClick={handleUpgrade}
      disabled={isLoading}
      className="bg-indigo-600 hover:bg-indigo-700 text-white h-11 px-5 rounded-xl font-semibold"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          A redirecionar...
        </>
      ) : (
        <>
          <Rocket className="h-4 w-4 mr-2" />
          Fazer Upgrade para Pro
        </>
      )}
    </Button>
  );
}
