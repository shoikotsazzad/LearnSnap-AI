import { ConfidenceText } from "./ConfidenceText";

export function KeyPointCard({ point }: { point: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
        •
      </span>
      <p className="text-sm text-foreground">
        <ConfidenceText text={point} />
      </p>
    </div>
  );
}
