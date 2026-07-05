"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main"
      className="flex min-h-svh flex-col items-center justify-center gap-6 px-5 pt-16 text-center"
    >
      <p className="eyebrow">Something went wrong</p>
      <h1 className="text-5xl font-semibold tracking-tighter sm:text-6xl">
        An unexpected error occurred
      </h1>
      <p className="max-w-md text-muted-foreground text-pretty">
        Sorry about that — try reloading the page. If the problem persists,
        feel free to reach out to me directly.
      </p>
      <Button onClick={reset} className="mt-2">
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Try again
      </Button>
    </main>
  );
}
