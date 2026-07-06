import type { CSSProperties } from "react";
import { INTRO_COLORS } from "./intro-config";

interface StreakSpec {
  /** Horizontal offset from screen center, in vw. */
  x: number;
  /** Extra delay after the streak phase begins, in seconds. */
  delay: number;
  /** One rise cycle, in seconds. */
  duration: number;
  /** Streak length, in vh. */
  height: number;
  /** Gaussian blur, in px — heavier blur reads as motion blur / depth. */
  blur: number;
  /** Peak opacity — streaks dim toward the edges of the field. */
  peak: number;
  color: string;
  /** Rise cycles before the field converges into the logo. */
  cycles: 1 | 2;
}

const { c1, c2, c3 } = INTRO_COLORS;

/**
 * Hand-tuned streak field, mirrored around the center beam. Delays grow
 * with distance from center so the energy visibly expands outward from the
 * beam; edge streaks are dimmer, softer and slower — cheap depth of field.
 */
const STREAKS: StreakSpec[] = [
  { x: -3.5, delay: 0.0, duration: 0.85, height: 62, blur: 1, peak: 0.95, color: c1, cycles: 2 },
  { x: 3.5, delay: 0.06, duration: 0.9, height: 58, blur: 1, peak: 0.9, color: c1, cycles: 2 },
  { x: -7, delay: 0.1, duration: 0.95, height: 52, blur: 1.5, peak: 0.8, color: c2, cycles: 2 },
  { x: 7, delay: 0.15, duration: 0.9, height: 55, blur: 1.5, peak: 0.85, color: c1, cycles: 2 },
  { x: -11.5, delay: 0.2, duration: 1.05, height: 46, blur: 2, peak: 0.7, color: c1, cycles: 1 },
  { x: 11.5, delay: 0.24, duration: 1.0, height: 48, blur: 2, peak: 0.75, color: c2, cycles: 1 },
  { x: -16.5, delay: 0.3, duration: 1.1, height: 40, blur: 2.5, peak: 0.6, color: c2, cycles: 1 },
  { x: 16.5, delay: 0.34, duration: 1.15, height: 42, blur: 2.5, peak: 0.6, color: c1, cycles: 1 },
  { x: -22.5, delay: 0.4, duration: 1.25, height: 34, blur: 3, peak: 0.45, color: c1, cycles: 1 },
  { x: 22.5, delay: 0.44, duration: 1.2, height: 36, blur: 3, peak: 0.5, color: c2, cycles: 1 },
  { x: -30, delay: 0.5, duration: 1.35, height: 28, blur: 4, peak: 0.35, color: c3, cycles: 1 },
  { x: 30, delay: 0.55, duration: 1.3, height: 30, blur: 4, peak: 0.35, color: c2, cycles: 1 },
  { x: -38, delay: 0.6, duration: 1.45, height: 24, blur: 5, peak: 0.25, color: c2, cycles: 1 },
  { x: 38, delay: 0.64, duration: 1.4, height: 22, blur: 5, peak: 0.25, color: c3, cycles: 1 },
];

/**
 * Phase 2 — a glowing vertical beam ignites at screen center, then a field
 * of light streaks rises around it like data flowing through fiber. Both
 * collapse toward the center when the logo starts drawing (phase 3). Pure
 * CSS: every element animates transform/opacity only; timings come from the
 * `--intro-*` custom properties set by the overlay root.
 */
export function LightStreaks() {
  return (
    <div aria-hidden="true">
      {/* Streak field — converges into the logo via .intro-streaks. */}
      <div className="intro-streaks absolute inset-0">
        {STREAKS.map((s, i) => (
          <span
            key={i}
            className="intro-streak"
            style={
              {
                left: `calc(50% + ${s.x}vw)`,
                "--streak-delay": `${s.delay}s`,
                "--streak-dur": `${s.duration}s`,
                "--streak-h": `${s.height}vh`,
                "--streak-blur": `${s.blur}px`,
                "--streak-peak": s.peak,
                "--streak-color": s.color,
                "--streak-cycles": s.cycles,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* Central beam — the ignition point of the whole sequence. */}
      <div className="intro-beam absolute top-1/2 left-1/2" />
    </div>
  );
}
