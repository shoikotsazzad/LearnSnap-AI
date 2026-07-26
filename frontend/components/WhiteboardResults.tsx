"use client";

import { ConfidenceText } from "./ConfidenceText";
import { KeyPointCard } from "./KeyPointCard";
import { MarkdownNotes } from "./MarkdownNotes";
import { FlashcardDeck } from "./FlashcardDeck";
import { Quiz } from "./Quiz";
import { FlowChart } from "./FlowChart";
import { useLanguage } from "@/lib/i18n";
import type { WhiteboardResult } from "@/lib/types";

export function WhiteboardResults({ result }: { result: WhiteboardResult }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium text-primary">{result.topic}</p>
        <h1 className="text-2xl font-bold text-foreground">
          <ConfidenceText text={result.title} />
        </h1>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-2 text-lg font-semibold">{t.whiteboard.summary}</h3>
        <p className="text-sm leading-relaxed text-foreground">
          <ConfidenceText text={result.summary} />
        </p>
      </div>

      {result.keyPoints?.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold">{t.whiteboard.keyPoints}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {result.keyPoints.map((point, i) => (
              <KeyPointCard key={i} point={point} />
            ))}
          </div>
        </div>
      )}

      <MarkdownNotes markdown={result.markdownNotes} />

      <FlowChart code={result.flowchart} />

      {result.flashcards?.length > 0 && <FlashcardDeck cards={result.flashcards} />}

      {result.quiz?.length > 0 && <Quiz questions={result.quiz} />}
    </div>
  );
}
