"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/how-it-works", label: t.nav.howItWorks },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-nav-border bg-nav-bg text-nav-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.jpeg"
            alt={t.nav.brand}
            width={36}
            height={36}
            className="rounded-lg"
            priority
          />
          <span className="text-lg font-semibold text-nav-foreground">{t.nav.brand}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-primary/20 text-primary"
                  : "text-nav-muted hover:bg-nav-hover hover:text-nav-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-nav-border bg-nav-hover p-0.5 text-xs font-semibold sm:flex">
            <button
              type="button"
              onClick={() => setLanguage("bn")}
              aria-pressed={language === "bn"}
              className={`rounded-full px-2.5 py-1.5 transition-colors ${
                language === "bn" ? "bg-primary text-primary-foreground" : "text-nav-muted"
              }`}
            >
              বাং
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
              className={`rounded-full px-2.5 py-1.5 transition-colors ${
                language === "en" ? "bg-primary text-primary-foreground" : "text-nav-muted"
              }`}
            >
              EN
            </button>
          </div>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-nav-border bg-nav-hover text-nav-foreground md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-nav-border px-6 py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                pathname === link.href ? "bg-primary/20 text-primary" : "text-nav-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center gap-1 rounded-full border border-nav-border bg-nav-hover p-0.5 text-xs font-semibold w-fit">
            <button
              type="button"
              onClick={() => setLanguage("bn")}
              className={`rounded-full px-2.5 py-1.5 ${
                language === "bn" ? "bg-primary text-primary-foreground" : "text-nav-muted"
              }`}
            >
              বাং
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-full px-2.5 py-1.5 ${
                language === "en" ? "bg-primary text-primary-foreground" : "text-nav-muted"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
