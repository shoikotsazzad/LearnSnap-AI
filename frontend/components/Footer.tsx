export function Footer() {
  return (
    <footer className="border-t border-nav-border bg-nav-bg text-nav-foreground">
      <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-nav-muted sm:px-10">
        <p>LearnSnap AI, built for Bangladesh &apos;26.</p>
        <p className="mt-1">
          Built by{" "}
          <a
            href="https://github.com/shoikotsazzad"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-nav-foreground hover:text-primary"
          >
            @shoikot sajjad
          </a>
        </p>
      </div>
    </footer>
  );
}
