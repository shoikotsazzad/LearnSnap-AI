"use client";

import { Camera, UploadCloud, Brain, LayoutList, PenSquare, ClipboardList } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function HowItWorksPage() {
  const { t } = useLanguage();
  const stepIcons = [Camera, UploadCloud, Brain, LayoutList];

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-16 px-6 py-14 sm:px-10">
      <div className="text-center">
        <span className="eyebrow">{t.nav.howItWorks}</span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {t.howItWorks.pageTitle}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">{t.howItWorks.subtitle}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {t.howItWorks.steps.map((step, i) => {
          const Icon = stepIcons[i];
          return (
            <div key={step.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground">
                {i + 1}. {step.title}
              </h3>
              <p className="text-sm text-muted">{step.description}</p>
            </div>
          );
        })}
      </div>

      <div>
        <h2 className="mb-5 text-center text-2xl font-bold">{t.howItWorks.modesTitle}</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <PenSquare className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-foreground">{t.howItWorks.whiteboardTitle}</h3>
            <p className="text-sm text-muted">{t.howItWorks.whiteboardBody}</p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <ClipboardList className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-foreground">{t.howItWorks.prescriptionTitle}</h3>
            <p className="text-sm text-muted">{t.howItWorks.prescriptionBody}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
