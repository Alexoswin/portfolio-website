import type { CSSProperties } from "react";

/**
 * Single source of truth for the cinematic intro — every duration, delay,
 * color and easing curve lives here. The values are handed to the stylesheet
 * as CSS custom properties (see `introCssVars`), so the keyframes in
 * globals.css contain no magic numbers of their own.
 */

/** sessionStorage key — present means the intro already played this session. */
export const INTRO_SESSION_KEY = "oa:intro-played";

/**
 * Attribute set on <html> by the inline `IntroScript` before first paint.
 * Values: "pending" (script decided the intro should run, React not yet
 * mounted — a plain CSS cover keeps the screen black), "playing" (overlay
 * mounted and owns the screen). Removing it releases the page entrance
 * animations (see `html[data-intro]` rules in globals.css).
 */
export const INTRO_HTML_ATTR = "data-intro";

/**
 * Timeline in seconds from overlay mount. `at` is when a phase begins,
 * `dur` how long its animation runs. Phases overlap intentionally —
 * that overlap is what makes the sequence feel continuous.
 */
export const INTRO_TIMELINE = {
  /** Phase 1 — black screen, ambient glow and particles fade in. */
  ambient: { at: 0, dur: 1.3 },
  /** Phase 2 — central vertical beam ignites… */
  beam: { at: 0.5, dur: 1.3 },
  /** …and expands into a field of flowing light streaks. */
  streaks: { at: 0.7, dur: 1.1 },
  /** Phase 3 — streaks converge and the logo draws itself in strokes. */
  logo: { at: 1.8, dur: 1.4 },
  /** Phase 4 — completed logo pulses, particles orbit it briefly. */
  pulse: { at: 3.2, dur: 0.9 },
  /** Phase 4 — logo rises and the name/title track in beneath it. */
  name: { at: 3.4, dur: 1.2 },
  /** Phase 5 — overlay fades/zooms out, portfolio entrance replays. */
  exit: { at: 4.2, dur: 1.0 },
  /** Overlay unmounts and the page is fully interactive. */
  total: 5.2,
} as const;

/** Per-letter stagger for the "OSWIN ALEX" reveal. */
export const INTRO_LETTER_STAGGER_S = 0.05;

/** Per-letter reveal duration. */
export const INTRO_LETTER_DUR_S = 0.7;

/** Role line starts tracking in this long after the name phase begins. */
export const INTRO_ROLE_DELAY_S = 0.35;

/** When the skip button fades in. */
export const INTRO_SKIP_APPEAR_S = 1.4;

/** Fast opacity fade used when skipping and by the reduced-motion path. */
export const INTRO_SKIP_EXIT_S = 0.45;

/** Reduced motion: how long the static name card holds before fading. */
export const INTRO_REDUCED_HOLD_S = 1.1;

/**
 * Intro palette. The intro always plays over black, so these are the
 * *dark-theme* glow tokens from globals.css (`[data-theme="dark"]
 * --glow-1/2/3`), fixed here as literals — keep the two in sync so the
 * overlay's exit hands off seamlessly into the aurora-lit page.
 */
export const INTRO_COLORS = {
  background: "#000000",
  /** Primary — neon cyan (--glow-1). */
  c1: "oklch(0.75 0.13 233)",
  /** Secondary — soft indigo (--glow-2). */
  c2: "oklch(0.66 0.17 278)",
  /** Accent — magenta-violet (--glow-3). */
  c3: "oklch(0.72 0.16 330)",
} as const;

/** Premium easing curves shared by every intro animation. */
export const INTRO_EASING = {
  /** easeOutExpo-like — arrivals. */
  out: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** easeInOutExpo-like — hand-offs between phases. */
  inOut: "cubic-bezier(0.87, 0, 0.13, 1)",
  /** easeOutQuart — settles. */
  outQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
} as const;

/**
 * Expose the timeline/palette to the stylesheet. Applied on the overlay
 * root so every `intro-*` rule in globals.css reads the same clock.
 */
export function introCssVars(): CSSProperties {
  const t = INTRO_TIMELINE;
  return {
    "--intro-c1": INTRO_COLORS.c1,
    "--intro-c2": INTRO_COLORS.c2,
    "--intro-c3": INTRO_COLORS.c3,
    "--intro-ease-out": INTRO_EASING.out,
    "--intro-ease-inout": INTRO_EASING.inOut,
    "--intro-ease-quart": INTRO_EASING.outQuart,
    "--intro-ambient-at": `${t.ambient.at}s`,
    "--intro-ambient-dur": `${t.ambient.dur}s`,
    "--intro-beam-at": `${t.beam.at}s`,
    "--intro-beam-dur": `${t.beam.dur}s`,
    "--intro-streaks-at": `${t.streaks.at}s`,
    "--intro-streaks-dur": `${t.streaks.dur}s`,
    "--intro-logo-at": `${t.logo.at}s`,
    "--intro-logo-dur": `${t.logo.dur}s`,
    "--intro-pulse-at": `${t.pulse.at}s`,
    "--intro-pulse-dur": `${t.pulse.dur}s`,
    "--intro-name-at": `${t.name.at}s`,
    "--intro-name-dur": `${t.name.dur}s`,
    "--intro-exit-at": `${t.exit.at}s`,
    "--intro-exit-dur": `${t.exit.dur}s`,
    "--intro-total": `${t.total}s`,
    "--intro-letter-dur": `${INTRO_LETTER_DUR_S}s`,
    "--intro-role-at": `${t.name.at + INTRO_ROLE_DELAY_S}s`,
    "--intro-skip-at": `${INTRO_SKIP_APPEAR_S}s`,
    "--intro-skip-dur": `${INTRO_SKIP_EXIT_S}s`,
  } as CSSProperties;
}
