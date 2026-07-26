"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { useLanguage } from "@/lib/i18n";

interface MarkdownNotesProps {
  markdown: string;
}

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), "mark"],
  attributes: {
    ...defaultSchema.attributes,
    mark: ["className", "title"],
  },
};

export function MarkdownNotes({ markdown }: MarkdownNotesProps) {
  const { t, language } = useLanguage();
  const [showRaw, setShowRaw] = useState(false);

  const confidenceTooltip =
    language === "en"
      ? "Gemma is not fully certain about this part, please double check"
      : "Gemma এই অংশ নিয়ে নিশ্চিত নয়, যাচাই করে নিন";

  const markConfidenceSpans = (input: string) =>
    input.replace(
      /\[\?\]([\s\S]*?)\[\/\?\]/g,
      (_match, inner) => `<mark class="confidence-flag" title="${confidenceTooltip}">${inner}</mark>`
    );

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t.whiteboard.markdownNotes}</h3>
        <button
          type="button"
          onClick={() => setShowRaw((v) => !v)}
          className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted hover:bg-muted-bg"
        >
          {showRaw ? t.whiteboard.renderedView : t.whiteboard.rawView}
        </button>
      </div>

      {showRaw ? (
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-muted-bg p-4 text-sm">
          {markdown}
        </pre>
      ) : (
        <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold prose-h2:text-base prose-h2:mt-6 prose-h2:mb-2 [&_.confidence-flag]:rounded [&_.confidence-flag]:bg-amber-200 [&_.confidence-flag]:px-0.5 [&_.confidence-flag]:text-amber-950 dark:[&_.confidence-flag]:bg-amber-500/30 dark:[&_.confidence-flag]:text-amber-100">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
          >
            {markConfidenceSpans(markdown)}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
