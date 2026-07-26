"use client";

import { useState } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactType = "query" | "complaint" | "other";

export default function ContactPage() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<ContactType>("query");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const typeOptions: { value: ContactType; label: string }[] = [
    { value: "query", label: t.contact.typeQuery },
    { value: "complaint", label: t.contact.typeComplaint },
    { value: "other", label: t.contact.typeOther },
  ];

  const validate = () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = t.contact.errorName;
    if (!EMAIL_PATTERN.test(email.trim())) next.email = t.contact.errorEmail;
    if (!message.trim()) next.message = t.contact.errorMessage;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    setSubmitted(true);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setType("query");
    setMessage("");
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center sm:px-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold">{t.contact.successTitle}</h1>
        <p className="text-muted">{t.contact.successBody}</p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:bg-muted-bg"
        >
          {t.contact.sendAnother}
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-6 py-14 sm:px-10">
      <div className="text-center">
        <span className="eyebrow inline-flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5" />
          {t.nav.contact}
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{t.contact.pageTitle}</h1>
        <p className="mx-auto mt-3 max-w-sm text-muted">{t.contact.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            {t.contact.nameLabel}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.contact.namePlaceholder}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
          />
          {errors.name && <p className="mt-1 text-xs text-danger">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            {t.contact.emailLabel}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.contact.emailPlaceholder}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
          />
          {errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
        </div>

        <div>
          <span className="mb-1.5 block text-sm font-medium text-foreground">{t.contact.typeLabel}</span>
          <div className="grid grid-cols-3 gap-2">
            {typeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setType(option.value)}
                aria-pressed={type === option.value}
                className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                  type === option.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted hover:bg-muted-bg"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
            {t.contact.messageLabel}
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.contact.messagePlaceholder}
            rows={5}
            className="w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
          />
          {errors.message && <p className="mt-1 text-xs text-danger">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {submitting ? t.contact.submittingCta : t.contact.submitCta}
        </button>
      </form>
    </main>
  );
}
