"use client";

import { AlertTriangle } from "lucide-react";
import { ConfidenceText } from "./ConfidenceText";
import { useLanguage } from "@/lib/i18n";
import type { PrescriptionItem } from "@/lib/types";

export function PrescriptionItemCard({ item, index }: { item: PrescriptionItem; index: number }) {
  const { t } = useLanguage();

  return (
    <div
      className={`rounded-2xl border p-5 ${
        item.unclear ? "border-amber-border bg-amber-bg" : "border-border bg-card"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <span className="text-xs font-medium text-muted">#{index + 1}</span>
          <h3 className="text-base font-semibold text-foreground">
            <ConfidenceText text={item.medicineName} />
          </h3>
        </div>
        {item.unclear && (
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-amber-border bg-amber-bg px-2.5 py-1 text-xs font-medium text-amber-text">
            <AlertTriangle className="h-3.5 w-3.5" />
            {t.prescription.unclearBadge}
          </span>
        )}
      </div>

      <dl className="flex flex-col gap-2 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">
            {t.prescription.rawTextLabel}
          </dt>
          <dd className="text-foreground">
            <ConfidenceText text={item.rawText} />
          </dd>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">
              {t.prescription.dosageLabel}
            </dt>
            <dd className="text-foreground">
              <ConfidenceText text={item.dosageExplanation} />
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">
              {t.prescription.durationLabel}
            </dt>
            <dd className="text-foreground">
              <ConfidenceText text={item.duration} />
            </dd>
          </div>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">
            {t.prescription.usageLabel}
          </dt>
          <dd className="text-foreground">
            <ConfidenceText text={item.categoryExplanation} />
          </dd>
        </div>
        {item.unclear && item.unclearNote && (
          <div className="mt-1 rounded-lg bg-amber-bg/60 p-2 text-xs text-amber-text">
            <ConfidenceText text={item.unclearNote} />
          </div>
        )}
      </dl>
    </div>
  );
}
