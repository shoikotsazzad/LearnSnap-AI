"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const STEP_INTERVAL_MS = 2200;

export function ProcessingIndicator() {
  const { t } = useLanguage();
  const steps = [t.processing.step1, t.processing.step2, t.processing.step3];
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((step) => Math.min(step + 1, steps.length - 1));
    }, STEP_INTERVAL_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-72 flex-col items-center justify-center gap-8 rounded-2xl border border-border bg-card p-8">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>

      <ol className="flex flex-col gap-3">
        {steps.map((step, index) => {
          const isDone = index < activeStep;
          const isActive = index === activeStep;
          return (
            <li key={step} className="flex items-center gap-3 text-sm">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${
                  isDone
                    ? "bg-success text-white"
                    : isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted-bg text-muted"
                }`}
              >
                {isDone ? <Check className="h-3 w-3" /> : index + 1}
              </span>
              <span className={isActive ? "font-medium text-foreground" : "text-muted"}>
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
