export type Language = "en" | "bn";

export interface Dictionary {
  nav: {
    brand: string;
    home: string;
    howItWorks: string;
    about: string;
    contact: string;
  };
  home: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    whiteboardTitle: string;
    whiteboardDesc: string;
    prescriptionTitle: string;
    prescriptionDesc: string;
    startCta: string;
    footer: string;
  };
  upload: {
    dragText: string;
    sizeHint: string;
    previewAlt: string;
    invalidType: string;
    invalidSize: string;
  };
  processing: {
    step1: string;
    step2: string;
    step3: string;
  };
  modeFlow: {
    backHome: string;
    newUpload: string;
    genericError: string;
    networkError: string;
  };
  whiteboard: {
    pageTitle: string;
    summary: string;
    keyPoints: string;
    markdownNotes: string;
    flashcards: string;
    quiz: string;
    rawView: string;
    renderedView: string;
    questionLabel: string;
    answerLabel: string;
    flipToAnswer: string;
    flipToQuestion: string;
    flowchart: string;
    flowchartError: string;
  };
  quiz: {
    answered: string;
    scoreLabel: string;
    explanationLabel: string;
  };
  prescription: {
    pageTitle: string;
    unclearBadge: string;
    rawTextLabel: string;
    dosageLabel: string;
    durationLabel: string;
    usageLabel: string;
    disclaimer: string;
  };
  theme: {
    switchToLight: string;
    switchToDark: string;
  };
  language: {
    switchLabel: string;
  };
  howItWorks: {
    pageTitle: string;
    subtitle: string;
    steps: { title: string; description: string }[];
    modesTitle: string;
    whiteboardTitle: string;
    whiteboardBody: string;
    prescriptionTitle: string;
    prescriptionBody: string;
  };
  about: {
    pageTitle: string;
    subtitle: string;
    missionTitle: string;
    missionBody: string;
    builtForTitle: string;
    builtForBody: string;
    techTitle: string;
    techBody: string;
    hackathonNote: string;
  };
  contact: {
    pageTitle: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    typeLabel: string;
    typeQuery: string;
    typeComplaint: string;
    typeOther: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitCta: string;
    submittingCta: string;
    successTitle: string;
    successBody: string;
    sendAnother: string;
    errorName: string;
    errorEmail: string;
    errorMessage: string;
  };
  common: {
    loading: string;
  };
}
