"use client";

import {
  Add01Icon,
  MinusSignIcon,
  Tick02Icon,
  UserStoryIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// Adapted for AgencyVault Business
const plans = [
  {
    id: "essencial",
    name: "Essencial",
    description: "Para contabilistas independentes",
    monthlyPrice: 29.99,
    yearlyPrice: 19.99,
    features: [
      "Até 10 Clientes",
      "Criptografia AES-256-GCM",
      "Cofre Digital Pessoal",
      "Suporte via Email",
    ],
  },
  {
    id: "profissional",
    name: "Profissional",
    description: "Para pequenos gabinetes em crescimento",
    monthlyPrice: 79.99,
    yearlyPrice: 59.99,
    features: [
      "Clientes Ilimitados",
      "Auditoria Completa (Logs)",
      "Gestão de Credenciais",
      "Suporte Prioritário 24/7",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Controlo total para grandes agências",
    monthlyPrice: 149.99,
    yearlyPrice: 119.99,
    features: [
      "Tudo do plano Profissional",
      "Gestão de Equipa Avançada",
      "Branding Personalizado",
      "Gestor de Conta Dedicado",
    ],
  },
];

const TRANSITION = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

function PricingCard() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [selectedPlan, setSelectedPlan] = useState("profissional");
  const [userCount, setUserCount] = useState(3);

  return (
    <div className="w-full max-w-[500px] flex flex-col gap-6 p-5 px-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl transition-all duration-300">
      <div className="flex flex-col gap-4 mb-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight text-center">
          Escolha o seu Plano
        </h1>

        <div className="bg-slate-100 dark:bg-slate-900 p-1 h-12 w-full rounded-2xl border border-slate-200 dark:border-slate-800 flex relative">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`flex-1 h-full rounded-xl text-sm font-semibold relative transition-colors duration-300 z-10 ${
              billingCycle === "monthly"
                ? "text-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {billingCycle === "monthly" && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700"
                transition={TRANSITION}
              />
            )}
            <span className="relative z-20">Mensal</span>
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`flex-1 h-full rounded-xl text-sm font-semibold relative transition-colors duration-300 z-10 flex items-center justify-center gap-2 ${
              billingCycle === "yearly"
                ? "text-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {billingCycle === "yearly" && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700"
                transition={TRANSITION}
              />
            )}
            <span className="relative z-20">Anual</span>
            <span className="relative z-20 bg-emerald-500 text-[10px] font-black px-2 py-0.5 rounded-full uppercase text-white tracking-wider">
              -25%
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const price =
            billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className="relative cursor-pointer"
            >
              <div
                className={`relative rounded-2xl transition-all duration-300 border ${
                  isSelected 
                    ? "bg-slate-50 dark:bg-slate-900 border-indigo-500 shadow-lg ring-1 ring-indigo-500/20" 
                    : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="mt-1 shrink-0">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? "border-indigo-500"
                              : "border-slate-300 dark:border-slate-700"
                          }`}
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="w-3 h-3 rounded-full bg-indigo-500"
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 25,
                                }}
                              />
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-slate-900 dark:text-white">
                        <NumberFlow
                          value={price}
                          format={{ style: "currency", currency: "EUR" }}
                        />
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                        / {billingCycle === "monthly" ? "mês" : "ano"}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.32, 0.72, 0, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 flex flex-col gap-6">
                          <div className="flex flex-col gap-3.5">
                            {plan.features.map((feature, idx) => (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: idx * 0.05,
                                  duration: 0.3,
                                }}
                                key={idx}
                                className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 font-medium"
                              >
                                <HugeiconsIcon
                                  icon={Tick02Icon}
                                  size={16}
                                  className="text-emerald-500"
                                />
                                {feature}
                              </motion.div>
                            ))}
                          </div>

                          <div className="h-px bg-slate-200 dark:bg-slate-800" />

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 shrink-0 flex items-center justify-center">
                                <HugeiconsIcon
                                  icon={UserStoryIcon}
                                  size={24}
                                  className="text-slate-500 dark:text-slate-400"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                                  Utilizadores
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                  Pacote base: {userCount}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setUserCount(Math.max(1, userCount - 1));
                                }}
                                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm transition-all text-slate-400 hover:text-slate-900 dark:hover:text-white active:scale-95 border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
                              >
                                <HugeiconsIcon icon={MinusSignIcon} size={14} />
                              </button>
                              <span className="text-sm font-bold w-4 text-center tabular-nums text-slate-700 dark:text-slate-300">
                                <NumberFlow value={userCount} />
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setUserCount(userCount + 1);
                                }}
                                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm transition-all text-slate-400 hover:text-slate-900 dark:hover:text-white active:scale-95 border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
                              >
                                <HugeiconsIcon icon={Add01Icon} size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] mt-2">
        Subscrever agora
      </button>
    </div>
  );
}

export default PricingCard;
