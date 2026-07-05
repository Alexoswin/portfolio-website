"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps extends React.ComponentProps<"div"> {
  /** Adds pointer-tracked 3D tilt (perspective rotateX/rotateY) on fine pointers. */
  tilt?: boolean;
}

const MAX_TILT_DEG = 7;

/**
 * Cursor-following radial highlight (see `.spotlight` in globals.css) with an
 * optional 3D tilt. Only CSS custom properties and an inline transform change
 * on pointermove — no React re-renders, GPU-composited throughout. Tilt is
 * skipped for touch pointers and under prefers-reduced-motion.
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
      className={cn("spotlight", tilt && "will-change-transform", className)}
      onPointerMove={(event) => {
        const el = event.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        el.style.setProperty("--spot-x", `${x}px`);
        el.style.setProperty("--spot-y", `${y}px`);

        if (tilt && event.pointerType !== "touch" && !reducedMotion.current) {
          const px = x / rect.width - 0.5;
          const py = y / rect.height - 0.5;
          el.style.transform =
            `perspective(900px) rotateX(${(-py * MAX_TILT_DEG).toFixed(2)}deg) ` +
            `rotateY(${(px * MAX_TILT_DEG).toFixed(2)}deg)`;
        }
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
