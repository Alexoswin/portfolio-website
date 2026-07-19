"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion";

interface RotatingTextProps {
  items: readonly string[];
  /** Milliseconds each item stays on screen. */
  interval?: number;
  className?: string;
}

/**
 * Cycles through short phrases with a rise-in swap. Hidden from assistive
 * tech — callers must render a static, screen-reader-only equivalent.
 * Under reduced motion the first item is shown without cycling.
 */
export function RotatingText({
  items,
  interval = 2600,
  className,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || items.length < 2) return;
    const id = setInterval(
      () => setIndex((current) => (current + 1) % items.length),
      interval,
    );
    return () => clearInterval(id);
  }, [items.length, interval, reducedMotion]);

  return (
    <span className={className} aria-hidden="true">
      {/* Remount on index change replays the entrance animation. */}
      <span key={index} className="rotating-text-item inline-block">
        {items[index]}
      </span>
    </span>
  );
}
