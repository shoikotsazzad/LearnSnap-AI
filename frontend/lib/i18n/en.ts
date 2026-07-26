import type { Dictionary } from "./types";

export const en: Dictionary = {
  nav: {
    brand: "LearnSnap AI",
    home: "Home",
    howItWorks: "How It Works",
    about: "About Us",
    contact: "Contact",
  },
  home: {
    badge: "AI Study Assistant",
    heroTitle: "Snap a Photo, Get Instant Clarity",
    heroSubtitle:
      "Upload a photo of a whiteboard or a prescription and we'll turn it into clear, organized information in seconds.",
    whiteboardTitle: "Whiteboard Mode",
    whiteboardDesc:
      "Turn messy whiteboard or notebook photos into clean summaries, flashcards, and quizzes instantly.",
    prescriptionTitle: "Prescription Explainer",
    prescriptionDesc:
      "Can't read your doctor's handwriting? Upload your prescription and get a clear, simple explanation.",
    startCta: "Try it now",
    footer: "LearnSnap AI, built for Bangladesh '26.",
  },
  upload: {
    dragText: "Drag and drop a photo here, or click to choose one",
    sizeHint: "JPG or PNG, up to 10MB",
    previewAlt: "Preview of the uploaded photo",
    invalidType: "Please upload a JPG or PNG image only",
    invalidSize: "Image size must be under 10MB",
  },
  processing: {
    step1: "Reading the image...",
    step2: "Understanding the content...",
    step3: "Generating your content...",
  },
  modeFlow: {
    backHome: "Back to home",
    newUpload: "Upload a new photo",
    genericError: "Something went wrong. Please try again.",
    networkError: "Could not reach the LearnSnap AI server. Is the backend running?",
  },
  whiteboard: {
    pageTitle: "Whiteboard Mode",
    summary: "Summary",
    keyPoints: "Key Points",
    markdownNotes: "Notes",
    flashcards: "Flashcards",
    quiz: "Quiz",
    rawView: "View raw",
    renderedView: "View rendered",
    questionLabel: "Question",
    answerLabel: "Answer",
    flipToAnswer: "Click to see the answer",
    flipToQuestion: "Click to go back to the question",
    flowchart: "Flow Chart",
    flowchartError: "Could not render the flow chart for this content.",
  },
  quiz: {
    answered: "answered",
    scoreLabel: "Your score",
    explanationLabel: "Explanation",
  },
  prescription: {
    pageTitle: "Prescription Explainer",
    unclearBadge: "Unclear, please confirm",
    rawTextLabel: "As written",
    dosageLabel: "How to take it",
    durationLabel: "Duration",
    usageLabel: "General use",
    disclaimer:
      "This information is for understanding only. Please talk to your doctor or pharmacist for proper advice.",
  },
  theme: {
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
  },
  language: {
    switchLabel: "Language",
  },
  howItWorks: {
    pageTitle: "How It Works",
    subtitle: "Four simple steps turn a photo into something you can actually study or understand.",
    steps: [
      {
        title: "Take a photo",
        description: "Snap a whiteboard, a notebook page, or a prescription with your phone.",
      },
      {
        title: "Upload it",
        description: "Drop the photo into LearnSnap AI. JPG or PNG, up to 10MB.",
      },
      {
        title: "Gemma reads and reasons",
        description:
          "Gemma looks at the image directly, understands the handwriting and layout, and works out what it actually means.",
      },
      {
        title: "Get structured output",
        description:
          "Within seconds you get organized notes, a summary, flashcards, and a quiz, or a plain-language prescription explanation.",
      },
    ],
    modesTitle: "Two modes, one idea",
    whiteboardTitle: "Whiteboard Mode",
    whiteboardBody:
      "Best for lecture boards, notebook pages, and mixed Bangla-English notes. Gemma removes duplicate content, organizes it logically, and builds study material from it: notes, a summary, key points, flashcards, and a ten-question quiz.",
    prescriptionTitle: "Prescription Explainer",
    prescriptionBody:
      "Best for understanding what a doctor actually wrote. Gemma transcribes each item, explains dosage shorthand in plain language, and flags anything it cannot read clearly. It never recommends a dosage or suggests alternative medicine.",
  },
  about: {
    pageTitle: "About Us",
    subtitle: "A study assistant built around one idea: photos should teach, not just sit in your gallery.",
    missionTitle: "Why we built this",
    missionBody:
      "Students photograph whiteboards constantly, and most of those photos are never looked at again. Families photograph prescriptions and still leave the pharmacy unsure what half of it means. LearnSnap AI exists to close that gap, using Gemma to actually read and reason about what is in the photo instead of just transcribing it.",
    builtForTitle: "Who it's for",
    builtForBody:
      "University and college students, teachers, coaching centers, and anyone who has ever needed a second look at a prescription before their next pharmacy visit.",
    techTitle: "How it's built",
    techBody:
      "Next.js and Tailwind on the frontend, an Express REST API on the backend, and Gemma's vision-capable model doing every meaningful step: reading the image, structuring the content, and generating the final output.",
    hackathonNote: "Built for the Bangladesh Hackathon '26, powered by Gemma.",
  },
  contact: {
    pageTitle: "Contact",
    subtitle: "Questions, complaints, or feedback. We would like to hear it.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    typeLabel: "What is this about?",
    typeQuery: "A question",
    typeComplaint: "A complaint",
    typeOther: "Something else",
    messageLabel: "Message",
    messagePlaceholder: "Tell us what's on your mind",
    submitCta: "Send message",
    submittingCta: "Sending...",
    successTitle: "Message received",
    successBody: "Thanks for reaching out. We will get back to you soon.",
    sendAnother: "Send another message",
    errorName: "Please enter your name",
    errorEmail: "Please enter a valid email address",
    errorMessage: "Please write a message",
  },
  common: {
    loading: "Loading...",
  },
};
