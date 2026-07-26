export function DisclaimerBanner({ text }: { text: string }) {
  return (
    <div
      role="note"
      className="flex items-start gap-3 rounded-xl border-2 border-amber-border bg-amber-bg px-4 py-3 text-sm font-medium text-amber-text"
    >
      <span aria-hidden="true" className="text-lg leading-none">⚠️</span>
      <p>{text}</p>
    </div>
  );
}
