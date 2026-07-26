"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/i18n";

export function FlowChart({ code }: { code: string }) {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    if (!code) return;
    let cancelled = false;

    async function render() {
      setError(false);
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: resolvedTheme === "dark" ? "dark" : "default",
        });
        const { svg } = await mermaid.render(`flowchart-${rawId}`, code);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [code, resolvedTheme, rawId]);

  if (!code) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold">{t.whiteboard.flowchart}</h3>
      {error ? (
        <p className="text-sm text-muted">{t.whiteboard.flowchartError}</p>
      ) : (
        <div ref={containerRef} className="flex justify-center overflow-x-auto [&_svg]:max-w-full" />
      )}
    </div>
  );
}
