```markdown
# LearnSnap AI — Build with Gemma @ Bangladesh Hackathon '26

Build a complete, production-quality full-stack web application called **LearnSnap AI**.

LearnSnap AI is an AI-powered vision-to-text study assistant with two core modes:
1. **Whiteboard Mode** — converts messy classroom whiteboard/notebook photos (Bangla + English mixed) into structured, interactive study material.
2. **Prescription Explainer Mode** — converts a photo of a medical prescription into a clear, simple Bangla explanation of what is written on it (explanation only — no medical advice, no dosage recommendations).

Gemma (vision-capable) is the **core intelligence** of this entire application. Every meaningful transformation — understanding the image, structuring content, generating study material, explaining prescriptions — must go through Gemma. This is NOT a chatbot wrapper. There is no conversational back-and-forth; each mode is a one-shot pipeline: image in → structured, generated output out.

---

## Tech Stack (Must Use)

- Next.js (Latest App Router) + TypeScript
- Tailwind CSS
- Node.js + Express.js (backend API server)
- MongoDB + Mongoose
- REST API architecture
- Gemma API (vision-capable variant) as the core AI engine

---

## Core Design Principle

Gemma must always be the one performing understanding and generation — not just OCR. Text extraction from the image is only step one. Gemma must reason over the extracted content, understand context, and generate new structured educational or explanatory output. Never stop at raw transcription.

---

## Mode 1: Whiteboard → Interactive Study Guide

### Target Users
University/college students, teachers, coaching centers — anyone converting whiteboard/notebook photos into usable study material.

### User Flow (Bangla, for reference)

```
Student
 ↓
বোর্ডের ছবি Upload
 ↓
Gemma Image বুঝবে
 ↓
Text বের করবে
 ↓
বোঝবে (Context বুঝবে)
 ↓
Structured করবে
 ↓
Summary বানাবে
 ↓
Key Points বানাবে
 ↓
Flashcard বানাবে
 ↓
Quiz বানাবে
 ↓
Markdown Notes দিবে
```

### Required Features

**1. Upload**
- JPG/PNG support
- Drag & drop uploader
- Image preview before processing
- Loading animation during processing

**2. Text Extraction (via Gemma vision)**
- Handle English, Bangla, and mixed-language content
- This is step one only — do not stop here

**3. Gemma Reasoning Layer**
Gemma must:
- Understand the lecture/board content as a whole
- Detect the topic
- Organize information logically (not just transcribe in order)
- Remove duplicate/redundant content
- Distinguish between prose notes, flowcharts, pseudocode, and diagrams

**4. Structured Markdown Notes**
Generate clean Markdown with sections:
- Title
- Overview
- Explanation
- Key Concepts
- Important Terms
- Formula (if present)
- Code (if present — extract into syntax-highlighted code blocks separately)
- Conclusion

**5. AI Summary**
Concise study summary, ~150–250 words.

**6. Key Points**
Most important concepts, displayed as individual cards.

**7. Flashcards**
Minimum 10 flashcards, format: Question → Answer (flip-card UI).

**8. Quiz Generator**
- 10 multiple-choice questions
- 4 options each
- Correct answer marked
- Short explanation for the correct answer

**9. Confidence Flagging** *(applies to both modes — see shared section below)*

---

## Mode 2: Prescription Explainer

### Purpose
A student or family member photographs a doctor's prescription. The app explains — in simple Bangla — what is written on it. This is an **explanation tool, not a medical advice tool.**

### Strict Scope (Important — follow exactly)

The app MUST:
- Read and transcribe what is written on the prescription (medicine names, frequency, duration, as written by the doctor)
- Explain, in simple Bangla, what each listed item generally is (e.g., "এটি একটি ব্যথানাশক ওষুধ" — general category/purpose only, in plain language)
- Explain any medical shorthand/abbreviations in plain language (e.g., "1+0+1" → "সকালে ও রাতে একটি করে")
- Clearly flag any word/section that is unclear or illegible — never silently guess
- Always display a fixed, non-removable disclaimer at the top and bottom of the output: **"এই তথ্য শুধুমাত্র বোঝার জন্য। সঠিক পরামর্শের জন্য ডাক্তার বা ফার্মাসিস্টের সাথে কথা বলুন।"** ("This is for understanding only. Please consult your doctor or pharmacist for proper advice.")

The app MUST NOT:
- Recommend a dosage, change a dosage, or suggest whether the prescription is correct
- Suggest alternative medicines
- Provide any medical advice, diagnosis, or treatment recommendation beyond explaining what is literally written

### User Flow

```
Upload prescription photo
 ↓
Gemma reads handwriting/print (vision)
 ↓
Extract: medicine names, dosage instructions, duration
 ↓
Flag any unclear/illegible words explicitly
 ↓
Explain each item in simple Bangla (category/purpose only)
 ↓
Explain shorthand notation in plain language
 ↓
Display disclaimer (top + bottom, always visible)
```

### UI for this mode
- Same upload/preview pattern as Whiteboard Mode
- Output shown as a clean card list: one card per medicine/instruction
- Unclear items shown with a distinct visual flag (e.g., amber highlight + "⚠️ অস্পষ্ট — নিশ্চিত করুন" badge)
- Disclaimer banner: fixed, high-contrast, cannot be dismissed/hidden

---

## Shared Feature: Confidence Flagging

Applies to both Whiteboard and Prescription modes.

- When Gemma extracts text from the image, it must indicate its confidence per line/word
- Anything below a reasonable confidence threshold gets visually flagged in the output (e.g., highlighted in yellow with a small "unclear" icon/tooltip)
- Prompt Gemma explicitly to output an uncertainty marker (e.g., wrap uncertain spans in a marker like `[?]uncertain text[/?]`) which the frontend parses and renders as a highlighted, flagged span
- This should be a visible, real feature in the demo — not just a hidden backend field

---

## Dashboard / Page Structure

```
Home (mode selector: Whiteboard / Prescription)
 ↓
Upload
 ↓
Processing (loading state)
 ↓
Results
```

**Whiteboard Results page contains:** Summary, Key Points, Markdown Notes (rendered + raw toggle), Flashcards (flip interaction), Quiz (interactive, shows score at end)

**Prescription Results page contains:** Disclaimer banner (top), per-item explanation cards, unclear-item flags, disclaimer banner (bottom)

---

## UI/UX Requirements

- Modern, minimal, clean interface — hackathon-demo quality
- Soft shadows, rounded cards, generous spacing
- Fully responsive (mobile-first, since users will demo on phones too)
- Smooth transitions/animations between Upload → Processing → Results (subtle, not gimmicky — e.g., fade/slide transitions, animated processing indicator showing pipeline steps like "Reading image → Understanding content → Generating notes")
- Dark/Light mode toggle
- Loading skeletons while content generates
- Toast notifications for success/error states
- Clear mode switcher (Whiteboard vs Prescription) on the home page, each with a short one-line description and icon
- Accessible: proper contrast, alt text, keyboard navigation

---

## Backend Requirements

- Node.js + Express.js REST API
- Organized structure:
  ```
  /controllers
  /routes
  /middleware
  /services   (Gemma API integration lives here)
  /models     (Mongoose schemas)
  /utils
  ```
- Input validation (file type/size limits on image upload)
- Environment variables for Gemma API key, MongoDB URI
- Centralized error handling middleware

### Key API Routes (suggested)
```
POST /api/whiteboard/analyze     → upload image, returns full study guide
POST /api/prescription/analyze   → upload image, returns explanation
GET  /api/history                → past uploads (optional, if time allows)
```

---

## Database (MongoDB)

Store:
- Uploaded image metadata (filename, mode, timestamp)
- Generated output (notes, summary, flashcards, quiz OR prescription explanation)
- Confidence flags data
- Timestamp / history log

Keep schema simple — this is a hackathon demo, not a production data model. Prioritize working end-to-end flow over schema completeness.

---

## Non-Goals (explicitly out of scope — do not build)

- No user authentication/login system (not needed for demo)
- No dosage recommendations or medical advice generation of any kind
- No multi-turn chat interface — every interaction is single upload → single structured output
- Do not over-engineer the database layer; a working demo matters more than data modeling depth

---

## Build Priority Order (given hackathon time constraints)

1. Whiteboard Mode end-to-end (upload → Gemma → Markdown notes + summary)
2. Flashcards + Quiz generation
3. Prescription Mode end-to-end (with disclaimer + safety framing)
4. Confidence flagging (visual highlighting) on both modes
5. UI polish — animations, dark mode, loading states
6. History/database persistence (only if time remains)

Get one mode fully working before polishing. A working core beats an incomplete showcase.
```

That's the complete file — copy it as-is into `CLAUDE.md` at your project root, then point Claude Code at it. Want the Gemma prompt templates (the actual system prompts for each mode) as a follow-up doc so your team has those ready too?