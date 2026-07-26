"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { UploadDropzone } from "./UploadDropzone";
import { ProcessingIndicator } from "./ProcessingIndicator";
import { WhiteboardResults } from "./WhiteboardResults";
import { PrescriptionResults } from "./PrescriptionResults";
import { analyzePrescription, analyzeWhiteboard, ApiRequestError } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";
import type { Mode, PrescriptionResult, WhiteboardResult } from "@/lib/types";

type Step = "upload" | "processing" | "results";

export function ModeFlow({ mode }: { mode: Mode }) {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<Step>("upload");
  const [result, setResult] = useState<WhiteboardResult | PrescriptionResult | null>(null);

  const pageTitle = mode === "whiteboard" ? t.whiteboard.pageTitle : t.prescription.pageTitle;

  const handleFile = async (file: File) => {
    setStep("processing");
    try {
      const data =
        mode === "whiteboard"
          ? await analyzeWhiteboard(file, language, t.modeFlow.networkError)
          : await analyzePrescription(file, language, t.modeFlow.networkError);
      setResult(data);
      setStep("results");
    } catch (err) {
      const message = err instanceof ApiRequestError ? err.message : t.modeFlow.genericError;
      toast.error(message);
      setStep("upload");
    }
  };

  const reset = () => {
    setResult(null);
    setStep("upload");
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10 sm:px-10">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            {t.modeFlow.backHome}
          </Link>
          <h1 className="mt-1 text-2xl font-bold">{pageTitle}</h1>
        </div>
        {step === "results" && (
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted-bg"
          >
            {t.modeFlow.newUpload}
          </button>
        )}
      </div>

      <div className="animate-[fadeIn_0.3s_ease-out]">
        {step === "upload" && <UploadDropzone onFileSelected={handleFile} />}
        {step === "processing" && <ProcessingIndicator />}
        {step === "results" && result && mode === "whiteboard" && (
          <WhiteboardResults result={result as WhiteboardResult} />
        )}
        {step === "results" && result && mode === "prescription" && (
          <PrescriptionResults result={result as PrescriptionResult} />
        )}
      </div>
    </div>
  );
}
