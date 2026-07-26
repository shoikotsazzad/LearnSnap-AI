import { ConfidenceText } from "./ConfidenceText";
import { DisclaimerBanner } from "./DisclaimerBanner";
import { PrescriptionItemCard } from "./PrescriptionItemCard";
import type { PrescriptionResult } from "@/lib/types";

export function PrescriptionResults({ result }: { result: PrescriptionResult }) {
  return (
    <div className="flex flex-col gap-5">
      <DisclaimerBanner text={result.disclaimer} />

      {result.overallNotes && (
        <p className="text-sm text-muted">
          <ConfidenceText text={result.overallNotes} />
        </p>
      )}

      <div className="flex flex-col gap-4">
        {result.items.map((item, i) => (
          <PrescriptionItemCard key={i} item={item} index={i} />
        ))}
      </div>

      <DisclaimerBanner text={result.disclaimer} />
    </div>
  );
}
