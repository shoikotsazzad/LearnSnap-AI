# LearnSnap AI

**An AI-powered vision-to-text study assistant.** Snap a photo of a messy whiteboard or a doctor's prescription, and let Gemma turn it into something you can actually use — structured study material or a plain-language explanation.

Built for **Build with Gemma @ Bangladesh Hackathon '26**.

**Live app:** [learnsnap-eta.vercel.app](https://learnsnap-eta.vercel.app)
**Backend API:** [backend-two-lemon-92.vercel.app](https://backend-two-lemon-92.vercel.app)

---

## The Idea

Classroom whiteboards get erased. Notebook photos are messy, half in Bangla and half in English, and hard to revise from later. Prescriptions are handwritten, full of medical shorthand, and easy to misread. LearnSnap AI turns both of those photos into something structured and understandable — in one shot, no back-and-forth chat, no manual re-typing.

This is **not a chatbot wrapper**. Every meaningful transformation — reading the image, understanding the content, structuring it, generating new material — is done by Gemma's vision-capable model. OCR is only step one; Gemma reasons over what it reads and produces new, organized output.

### Mode 1 — Whiteboard → Interactive Study Guide

Upload a photo of a whiteboard or notebook page (Bangla, English, or mixed). Gemma:

- Reads the handwriting/print in the image
- Understands the topic and reorganizes the content logically (not just top-to-bottom transcription)
- Separates prose, flowcharts, pseudocode, and diagrams
- Generates:
  - Structured Markdown notes (title, overview, explanation, key concepts, terms, formulas, code blocks, conclusion)
  - A concise ~150–250 word summary
  - Key point cards
  - 10+ flip-card flashcards
  - A 10-question multiple-choice quiz with explanations

### Mode 2 — Prescription Explainer

Upload a photo of a prescription. Gemma reads what the doctor wrote and explains it in **simple Bangla** — nothing more:

- Transcribes medicine names, frequency, and duration as written
- Explains what each item generally is (category/purpose only — e.g. "এটি একটি ব্যথানাশক ওষুধ")
- Translates medical shorthand into plain language (e.g. "1+0+1" → "সকালে ও রাতে একটি করে")
- Flags anything illegible or unclear instead of guessing
- Always shows a fixed, non-removable disclaimer (top and bottom): *"এই তথ্য শুধুমাত্র বোঝার জন্য। সঠিক পরামর্শের জন্য ডাক্তার বা ফার্মাসিস্টের সাথে কথা বলুন।"*

This mode never recommends, changes, or judges a dosage, and never suggests alternative medicines — it explains what's on the page, nothing else.

### Shared: Confidence Flagging

In both modes, Gemma is prompted to mark any text it isn't confident about. The frontend parses those markers and visually flags the uncertain spans (highlight + tooltip) instead of silently presenting a guess as fact.

---

## Tech Stack

**Frontend**
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- `react-markdown` + `remark-gfm` + `rehype-sanitize` for rendering generated notes
- `mermaid` for flowchart rendering
- `next-themes` for dark/light mode
- `sonner` for toast notifications
- `lucide-react` for icons

**Backend**
- Node.js + Express.js (REST API)
- MongoDB + Mongoose
- Multer for image upload handling
- Gemma (vision-capable) via the Gemini API as the core reasoning/generation engine

**Deployment**
- Frontend & backend both deployed on Vercel

---

## Project Structure

```
LearnSnap AI/
├── frontend/                # Next.js app
│   ├── app/                 # Routes: /, /whiteboard, /prescription, /about, /how-it-works, /contact
│   ├── components/          # UI: Navbar, Footer, UploadDropzone, Flashcard, Quiz, MarkdownNotes, etc.
│   └── lib/                 # API client, i18n (Bangla/English), types
│
└── backend/                 # Express REST API
    ├── controllers/         # Request handlers per mode
    ├── routes/               # /api/whiteboard, /api/prescription, /api/history
    ├── middleware/           # Upload validation, centralized error handling
    ├── services/             # Gemma API integration + prompt templates
    ├── models/               # Mongoose schemas (AnalysisRecord)
    └── utils/                # DB connection, helpers
```

## API Routes

```
POST /api/whiteboard/analyze     → upload image, returns full study guide
POST /api/prescription/analyze   → upload image, returns explanation
GET  /api/history                → past analyses
```

---

## Running Locally

**Backend**
```bash
cd backend
cp .env.example .env   # fill in GEMMA_API_KEY, MONGODB_URI, etc.
npm install
npm run dev             # http://localhost:5050
```

**Frontend**
```bash
cd frontend
cp .env.example .env.local   # NEXT_PUBLIC_API_BASE_URL=http://localhost:5050
npm install
npm run dev              # http://localhost:3000
```

---

## Non-Goals

- No user authentication — this is a hackathon demo, not a production account system
- No dosage recommendations or medical advice of any kind
- No multi-turn chat — every interaction is a single upload → single structured output

---

## Credit

Built by **[@shoikotsazzad](https://github.com/shoikotsazzad)** for Build with Gemma @ Bangladesh Hackathon '26.
