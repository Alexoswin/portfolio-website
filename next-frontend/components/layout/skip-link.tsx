export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-[70] rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Skip to main content
    </a>
  );
}
