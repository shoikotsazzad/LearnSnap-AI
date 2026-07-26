"use client";

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface ModeCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  accentClass: string;
}

export function ModeCard({ href, icon: Icon, title, description, accentClass }: ModeCardProps) {
  const { t } = useLanguage();

  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary sm:p-8"
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accentClass}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
        {t.home.startCta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
