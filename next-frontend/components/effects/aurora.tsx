"use client";

import { useEffect, useRef } from "react";

/** Max cursor-drift travel in px, per blob — varied for a parallax feel. */
const DRIFT_FACTORS = [18, -24, 14];

/**
 * Ambient page background: drifting aurora glows over a masked hex lattice.
 * The orbit/scale keyframes stay pure CSS; a thin pointermove listener adds a
 * slight cursor-following drift on top via a nested wrapper's transform (so
 * it composes with, rather than fights, the running keyframe animation).
 * Skipped for touch pointers and under prefers-reduced-motion.
 */
export function Aurora() {
  const driftRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const dx = event.clientX / window.innerWidth - 0.5;
        const dy = event.clientY / window.innerHeight - 0.5;
        driftRefs.current.forEach((el, i) => {
          if (!el) return;
          const factor = DRIFT_FACTORS[i];
          el.style.transform = `translate3d(${(dx * factor).toFixed(1)}px, ${(dy * factor).toFixed(1)}px, 0)`;
        });
      });
    };

    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Nested: the hex pattern is itself a mask, so the edge fade must
          live on a wrapper — both on one element would override each other. */}
      <div className="mask-fade-edges absolute inset-0">
        <div className="bg-hex-grid absolute inset-0" />
      </div>

      {/* Scroll-linked depth: the glow layer drifts up and swells slightly as
          the page scrolls (CSS scroll-driven animation, static elsewhere). */}
      <div className="aurora-parallax absolute inset-0">
        <div
          ref={(el) => {
            driftRefs.current[0] = el;
          }}
          className="absolute -top-[20%] left-[8%] h-[55vh] w-[42vw] min-w-80 transition-transform duration-700 ease-out will-change-transform"
        >
          <div
            className="animate-aurora h-full w-full rounded-full opacity-(--aurora-opacity) blur-[110px] will-change-transform"
            style={{
              background:
                "radial-gradient(closest-side, var(--glow-1), transparent 70%)",
            }}
          />
        </div>
        <div
          ref={(el) => {
            driftRefs.current[1] = el;
          }}
          className="absolute top-[30%] -right-[12%] h-[60vh] w-[45vw] min-w-80 transition-transform duration-700 ease-out will-change-transform"
        >
          <div
            className="animate-aurora h-full w-full rounded-full opacity-(--aurora-opacity) blur-[120px] will-change-transform"
            style={{
              background:
                "radial-gradient(closest-side, var(--glow-2), transparent 70%)",
              animationDuration: "30s",
              animationDelay: "-8s",
            }}
          />
        </div>
        <div
          ref={(el) => {
            driftRefs.current[2] = el;
          }}
          className="absolute -bottom-[25%] left-[30%] h-[50vh] w-[40vw] min-w-72 transition-transform duration-700 ease-out will-change-transform"
        >
          <div
            className="animate-aurora h-full w-full rounded-full opacity-(--aurora-opacity) blur-[130px] will-change-transform"
            style={{
              background:
                "radial-gradient(closest-side, var(--glow-3), transparent 70%)",
              animationDuration: "36s",
              animationDelay: "-16s",
            }}
          />
        </div>
      </div>
    </div>
  );
}
