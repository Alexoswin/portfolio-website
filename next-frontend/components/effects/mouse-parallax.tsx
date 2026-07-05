"use client";

import { useEffect, useRef } from "react";

/**
 * Publishes normalized pointer coordinates (-0.5..0.5) as `--mpx` / `--mpy`
 * custom properties on its element, letting server-rendered descendants build
 * depth-layered parallax with plain CSS `calc()`. rAF-throttled; inactive on
 * touch devices and under prefers-reduced-motion.
 */
export function MouseParallax({ className, children }: React.ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    const onMove = (event: PointerEvent) => {
      if (raf) return;
      const x = (event.clientX / window.innerWidth - 0.5).toFixed(3);
      const y = (event.clientY / window.innerHeight - 0.5).toFixed(3);
      raf = requestAnimationFrame(() => {
        raf = 0;
        node.style.setProperty("--mpx", x);
        node.style.setProperty("--mpy", y);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
