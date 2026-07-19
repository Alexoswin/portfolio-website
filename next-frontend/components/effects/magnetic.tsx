"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticProps extends React.ComponentProps<"div"> {
  /** Max pull distance in px at the wrapper's edge. */
  strength?: number;
}

/**
 * Magnetic hover — the child is gently pulled toward the cursor and springs
 * back on leave. Only an inline transform changes (no re-renders); inert for
 * touch pointers and under prefers-reduced-motion.
 */
export function Magnetic({
  strength = 8,
  className,
  children,
  ...props
}: MagneticProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn("inline-block", className)}
      onPointerMove={(event) => {
        const inner = innerRef.current;
        if (!inner || event.pointerType === "touch") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
          return;
        const rect = event.currentTarget.getBoundingClientRect();
        const dx = (event.clientX - rect.left) / rect.width - 0.5;
        const dy = (event.clientY - rect.top) / rect.height - 0.5;
        inner.style.transform = `translate(${(dx * strength * 2).toFixed(1)}px, ${(dy * strength * 2).toFixed(1)}px)`;
      }}
      onPointerLeave={() => {
        const inner = innerRef.current;
        if (inner) inner.style.transform = "";
      }}
      {...props}
    >
      <div
        ref={innerRef}
        className="transition-transform duration-300 ease-out will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
