"use client";

import { cn } from "@/lib/utils";

/**
 * Adds a cursor-following radial highlight (see `.spotlight` in globals.css).
 * Only CSS custom properties change on pointermove, so there are no re-renders.
 */
export function Spotlight({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("spotlight", className)}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--spot-x",
          `${event.clientX - rect.left}px`,
        );
        event.currentTarget.style.setProperty(
          "--spot-y",
          `${event.clientY - rect.top}px`,
        );
      }}
      {...props}
    >
      {children}
    </div>
  );
}
