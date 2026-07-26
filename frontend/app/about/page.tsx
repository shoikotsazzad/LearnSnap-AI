"use client";

import { Heart, Users, Code2, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useLanguage();

  const sections = [
    { icon: Heart, title: t.about.missionTitle, body: t.about.missionBody },
    { icon: Users, title: t.about.builtForTitle, body: t.about.builtForBody },
    { icon: Code2, title: t.about.techTitle, body: t.about.techBody },
  ];

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-6 py-14 sm:px-10">
      <div className="text-center">
        <span className="eyebrow">{t.nav.about}</span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {t.about.pageTitle}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">{t.about.subtitle}</p>
      </div>

      <div className="flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.title} className="flex gap-4 rounded-2xl border border-border bg-card p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <section.icon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{section.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">{section.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 rounded-2xl border border-primary/30 bg-primary/5 px-6 py-4 text-center text-sm font-medium text-primary">
        <Sparkles className="h-4 w-4" />
        {t.about.hackathonNote}
      </div>
    </main>
  );
}
