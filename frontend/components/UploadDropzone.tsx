"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

interface UploadDropzoneProps {
  onFileSelected: (file: File) => void;
}

export function UploadDropzone({ onFileSelected }: UploadDropzoneProps) {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSelect = useCallback(
    (file: File | undefined) => {
      if (!file) return;

      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(t.upload.invalidType);
        return;
      }

      if (file.size > MAX_SIZE_BYTES) {
        toast.error(t.upload.invalidSize);
        return;
      }

      setPreviewUrl(URL.createObjectURL(file));
      onFileSelected(file);
    },
    [onFileSelected, t]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={t.upload.dragText}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        validateAndSelect(e.dataTransfer.files?.[0]);
      }}
      className={`flex min-h-72 cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
        isDragging
          ? "border-primary bg-primary/5"
          : "border-border bg-card hover:border-primary/60"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        className="hidden"
        onChange={(e) => validateAndSelect(e.target.files?.[0])}
      />

      {previewUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt={t.upload.previewAlt}
          className="max-h-64 rounded-lg object-contain shadow-sm"
        />
      ) : (
        <>
          <UploadCloud className="h-10 w-10 text-muted" strokeWidth={1.5} />
          <div>
            <p className="font-medium text-foreground">{t.upload.dragText}</p>
            <p className="mt-1 text-sm text-muted">{t.upload.sizeHint}</p>
          </div>
        </>
      )}
    </div>
  );
}
