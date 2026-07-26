"use client";

import { useState } from "react";
import { ConfidenceText } from "./ConfidenceText";
import { useLanguage } from "@/lib/i18n";
import type { Flashcard as FlashcardType } from "@/lib/types";

export function Flashcard({ card, index }: { card: FlashcardType; index: number }) {
  const { t } = useLanguage();
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      aria-label={`${t.whiteboard.questionLabel} ${index + 1}. ${flipped ? t.whiteboard.flipToQuestion : t.whiteboard.flipToAnswer}`}
      className="group h-44 w-full [perspective:1000px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded-2xl"
    >
      <div
        className={`relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-border bg-card p-5 text-left shadow-sm [backface-visibility:hidden]">
          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            {t.whiteboard.questionLabel} {index + 1}
          </span>
          <p className="text-sm font-medium text-foreground">
            <ConfidenceText text={card.question} />
          </p>
          <span className="text-xs text-muted">{t.whiteboard.flipToAnswer}</span>
        </div>
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-primary/40 bg-primary/5 p-5 text-left shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="text-xs font-medium uppercase tracking-wide text-primary">
            {t.whiteboard.answerLabel}
          </span>
          <p className="text-sm font-medium text-foreground">
            <ConfidenceText text={card.answer} />
          </p>
          <span className="text-xs text-muted">{t.whiteboard.flipToQuestion}</span>
        </div>
      </div>
    </button>
  );
}
