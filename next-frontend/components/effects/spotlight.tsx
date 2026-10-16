"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps extends React.ComponentProps<"div"> {
  /** Adds pointer-tracked 3D tilt (perspective rotateX/rotateY) on fine pointers. */
  tilt?: boolean;
}

const MAX_TILT_DEG = 7;

/**
 * Pointer-tracked 3D tilt. Only an inline transform changes on pointermove —
 * no React re-renders, GPU-composited throughout. Skipped for touch pointers
 * and under prefers-reduced-motion.
 */
export function Spotlight({
  tilt = false,
  className,
  children,
  ...props
}: SpotlightProps) {
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  return (
    <div
      className={cn(tilt && "will-change-transform", className)}
      onPointerMove={(event) => {
        if (!tilt || event.pointerType === "touch" || reducedMotion.current) {
          return;
        }
        const el = event.currentTarget;
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        el.style.transform =
          `perspective(900px) rotateX(${(-py * MAX_TILT_DEG).toFixed(2)}deg) ` +
          `rotateY(${(px * MAX_TILT_DEG).toFixed(2)}deg)`;
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.transform = "";
      }}
      {...props}
    >
      {children}
    </div>
  );
}
