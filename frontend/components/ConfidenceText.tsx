"use client";

import { parseConfidenceSegments } from "@/lib/confidenceParser";
import { useLanguage } from "@/lib/i18n";

interface ConfidenceTextProps {
  text: string;
  as?: "span" | "p";
  className?: string;
}

export function ConfidenceText({ text, as = "span", className }: ConfidenceTextProps) {
  const { language } = useLanguage();
  const segments = parseConfidenceSegments(text);
  const Tag = as;
  const tooltip =
    language === "en"
      ? "Gemma is not fully certain about this part, please double check"
      : "Gemma এই অংশ নিয়ে নিশ্চিত নয়, যাচাই করে নিন";

  return (
    <Tag className={className}>
      {segments.map((segment, index) =>
        segment.uncertain ? (
          <mark
            key={index}
            title={tooltip}
            className="rounded bg-amber-200 px-0.5 text-amber-950 decoration-amber-500 dark:bg-amber-500/30 dark:text-amber-100"
          >
            {segment.text}
            <span aria-hidden="true" className="ml-0.5 text-[0.7em]">⚠️</span>
          </mark>
        ) : (
          <span key={index}>{segment.text}</span>
        )
      )}
    </Tag>
  );
}
