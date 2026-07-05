import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-svh flex-col items-center justify-center gap-6 px-5 pt-16 text-center"
    >
      <p className="eyebrow">Error 404</p>
      <h1 className="text-gradient text-7xl font-semibold tracking-tighter sm:text-8xl">
        Lost in space
      </h1>
      <p className="max-w-md text-muted-foreground text-pretty">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <ButtonLink href="/" className="mt-2">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to home
      </ButtonLink>
    </main>
  );
}
