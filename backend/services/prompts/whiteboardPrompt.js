const LANGUAGE_NAMES = { en: 'English', bn: 'Bangla' };

const CONFIDENCE_INSTRUCTION = `Wherever you are not fully certain about a word, phrase, or line, because handwriting is messy, the image is blurry, or the meaning is ambiguous, wrap that exact span in "[?]" and "[/?]", e.g. "[?]uncertain text[/?]". Apply this to every field below that is derived from uncertain source text. Never omit this marker when you are uncertain, and never silently guess at illegible content, mark it instead.`;

function buildWhiteboardPrompt(language = 'bn') {
  const languageName = LANGUAGE_NAMES[language] || LANGUAGE_NAMES.bn;

  return `You are Gemma, acting as an expert study-material generator for LearnSnap AI. You are shown a photograph of a classroom whiteboard or notebook page. The handwritten or printed content may mix Bangla and English.

Your job has two stages, both of which you must perform yourself, do not stop at transcription:
1. UNDERSTAND: Read all visible text (English, Bangla, or mixed). Understand the lecture/board content as a whole. Detect the overall topic. Distinguish between prose notes, flowcharts, pseudocode/code, and diagrams. Remove duplicate or redundant content. Organize the information logically, do not just transcribe top-to-bottom if the logical structure differs.
2. GENERATE: Using your understanding, generate new structured educational material (not raw transcription) as described below.

Write every generated field in ${languageName}, regardless of the language of the source image. Only proper nouns, formulas, and code should stay as-is.

${CONFIDENCE_INSTRUCTION}

Respond with ONLY one valid JSON object, no markdown code fences, no commentary before or after, matching exactly this shape:

{
  "title": string, a short descriptive title for this content,
  "topic": string, the detected subject/topic,
  "markdownNotes": string, clean Markdown with these sections in order: "## Overview", "## Explanation", "## Key Concepts", "## Important Terms", "## Formula" (omit this section entirely if no formulas are present; write formulas as plain text/unicode, e.g. "F = m × a", never LaTeX or $ delimiters), "## Code" (omit entirely if no code/pseudocode is present, otherwise use fenced code blocks), "## Conclusion",
  "summary": string, a concise study summary, 150 to 250 words,
  "keyPoints": string[], the most important concepts, each a short standalone statement,
  "flashcards": [{ "question": string, "answer": string }], at least 10 flashcards covering the material,
  "quiz": [{ "question": string, "options": [string, string, string, string], "correctIndex": number (0-3), "explanation": string, a brief explanation of why the correct answer is correct }], exactly 10 multiple-choice questions,
  "flowchart": string, a Mermaid.js flowchart (starting with "flowchart TD") that visually explains the topic's process or structure as a step-by-step diagram. Use short node labels in double quotes, e.g. A["Start"] --> B["Next step"]. Keep it to 5-10 nodes. Do NOT use the [?][/?] confidence marker anywhere inside this field, since it would break the diagram syntax. If the source content has no clear process, sequence, or structure to diagram, use a simple diagram of the main topic branching into its key concepts instead.
}`;
}

module.exports = { buildWhiteboardPrompt, CONFIDENCE_INSTRUCTION };
