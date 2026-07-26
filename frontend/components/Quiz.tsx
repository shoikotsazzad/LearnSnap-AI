"use client";

import { useMemo, useState } from "react";
import { ConfidenceText } from "./ConfidenceText";
import { useLanguage } from "@/lib/i18n";
import type { QuizQuestion } from "@/lib/types";

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const { t } = useLanguage();
  const [selections, setSelections] = useState<(number | null)[]>(
    () => questions.map(() => null)
  );

  const answeredCount = selections.filter((s) => s !== null).length;
  const isComplete = answeredCount === questions.length;

  const score = useMemo(
    () =>
      selections.reduce<number>(
        (total, selection, i) =>
          selection === questions[i].correctIndex ? total + 1 : total,
        0
      ),
    [selections, questions]
  );

  const selectOption = (questionIndex: number, optionIndex: number) => {
    setSelections((prev) => {
      if (prev[questionIndex] !== null) return prev;
      const next = [...prev];
      next[questionIndex] = optionIndex;
      return next;
    });
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t.whiteboard.quiz}</h3>
        <span className="text-sm text-muted">
          {answeredCount}/{questions.length} {t.quiz.answered}
        </span>
      </div>

      {isComplete && (
        <div className="mb-6 rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-lg font-semibold text-primary">
            {t.quiz.scoreLabel}: {score} / {questions.length}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {questions.map((q, qIndex) => {
          const selected = selections[qIndex];
          const answered = selected !== null;

          return (
            <div key={qIndex} className="border-b border-border pb-6 last:border-0 last:pb-0">
              <p className="mb-3 font-medium text-foreground">
                {qIndex + 1}. <ConfidenceText text={q.question} />
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {(q.options ?? []).map((option, oIndex) => {
                  const isCorrect = oIndex === q.correctIndex;
                  const isSelected = oIndex === selected;

                  let stateClass = "border-border hover:border-primary/50";
                  if (answered && isCorrect) {
                    stateClass = "border-success bg-success/10";
                  } else if (answered && isSelected && !isCorrect) {
                    stateClass = "border-danger bg-danger/10";
                  }

                  return (
                    <button
                      key={oIndex}
                      type="button"
                      disabled={answered}
                      onClick={() => selectOption(qIndex, oIndex)}
                      className={`rounded-lg border p-3 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-default ${stateClass}`}
                    >
                      <ConfidenceText text={option} />
                    </button>
                  );
                })}
              </div>
              {answered && (
                <p className="mt-3 rounded-lg bg-muted-bg p-3 text-sm text-muted">
                  <span className="font-medium text-foreground">{t.quiz.explanationLabel}: </span>
                  <ConfidenceText text={q.explanation} />
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
