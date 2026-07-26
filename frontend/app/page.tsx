"use client";

import Link from "next/link";
import { Camera, ClipboardList, Sparkles, PenSquare } from "lucide-react";
import { ModeCard } from "@/components/ModeCard";
import { useLanguage } from "@/lib/i18n";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center gap-16 px-6 py-16 text-center sm:px-10">
        <div className="flex flex-col items-center gap-5">
          <span className="eyebrow inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1">
            <Sparkles className="h-3.5 w-3.5" />
            {t.home.badge}
          </span>
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            {t.home.heroTitle}
          </h1>
          <p className="mx-auto max-w-xl text-base text-muted sm:text-lg">
            {t.home.heroSubtitle}
          </p>
        </div>

        <div className="grid w-full gap-5 sm:grid-cols-2">
          <ModeCard
            href="/whiteboard"
            title={t.home.whiteboardTitle}
            description={t.home.whiteboardDesc}
            accentClass="bg-primary/10 text-primary"
            icon={PenSquare}
          />
          <ModeCard
            href="/prescription"
            title={t.home.prescriptionTitle}
            description={t.home.prescriptionDesc}
            accentClass="bg-accent/10 text-accent"
            icon={ClipboardList}
          />
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-3">
          {[Camera, Sparkles, ClipboardList].map((Icon, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-5"
            >
              <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
              <p className="text-sm text-muted">
                {i === 0 && t.howItWorks.steps[0].description}
                {i === 1 && t.howItWorks.steps[2].description}
                {i === 2 && t.howItWorks.steps[3].description}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/how-it-works"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {t.nav.howItWorks}
        </Link>
      </main>

      <footer className="px-6 py-6 text-center text-xs text-muted sm:px-10">
        {t.home.footer}
      </footer>
    </div>
  );
}
