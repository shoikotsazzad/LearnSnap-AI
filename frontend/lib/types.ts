export interface Flashcard {
  question: string;
  answer: string;
}

export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface WhiteboardResult {
  title: string;
  topic: string;
  markdownNotes: string;
  summary: string;
  keyPoints: string[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  flowchart: string;
}

export interface PrescriptionItem {
  rawText: string;
  medicineName: string;
  dosageShorthand: string;
  dosageExplanation: string;
  duration: string;
  categoryExplanation: string;
  unclear: boolean;
  unclearNote: string;
}

export interface PrescriptionResult {
  items: PrescriptionItem[];
  overallNotes: string;
  disclaimer: string;
}

export type Mode = "whiteboard" | "prescription";

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
}
