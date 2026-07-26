"use client";

import { Flashcard } from "./Flashcard";
import { useLanguage } from "@/lib/i18n";
import type { Flashcard as FlashcardType } from "@/lib/types";

export function FlashcardDeck({ cards }: { cards: FlashcardType[] }) {
  const { t } = useLanguage();

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold">{t.whiteboard.flashcards}</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <Flashcard key={index} card={card} index={index} />
        ))}
      </div>
    </div>
  );
}
