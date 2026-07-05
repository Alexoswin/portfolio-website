"use client";

import { useEffect, useRef } from "react";

interface RevealProps extends React.ComponentProps<"div"> {
  /** Transition delay in seconds — use for staggering siblings. */
  delay?: number;
}

/**
 * Reveals children when scrolled into view. The animation itself is pure CSS
 * (see `[data-reveal]` in globals.css); this component only flips a data
 * attribute, so children can stay server-rendered and no motion library is
 * shipped. Content is visible by default for no-JS and reduced-motion users.
 */
export function Reveal({ delay = 0, style, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.reveal = "in";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      style={{ "--reveal-delay": `${delay}s`, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
