"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { profile } from "@/lib/profile";
import {
  INTRO_HTML_ATTR,
  INTRO_LETTER_STAGGER_S,
  INTRO_REDUCED_HOLD_S,
  INTRO_SKIP_EXIT_S,
  INTRO_TIMELINE,
  introCssVars,
} from "./intro-config";
import { DeveloperLogo } from "./developer-logo";
import { LightStreaks } from "./light-streaks";
import { Particles } from "./particles";

interface DeveloperIntroProps {
  /** prefers-reduced-motion: static name card with an opacity-only fade. */
  reduced: boolean;
  /** Called once the overlay has fully faded — the provider unmounts it. */
  onFinish: () => void;
}

/**
 * The cinematic first-visit overlay. The whole timeline is declarative CSS
 * (see the "Cinematic intro" section of globals.css) driven by the custom
 * properties from `introCssVars` — JavaScript only bookends it:
 *
 *   mount            → data-intro="playing" on <html> (drops the pre-paint
 *                      cover in the same frame this overlay appears)
 *   exit.at (4.2s)   → data-intro removed, which restarts the portfolio's
 *                      own entrance animations underneath the fading overlay
 *   total (5.2s)     → onFinish, overlay unmounts, page fully interactive
 *
 * Escape or the skip button jumps straight to a fast fade at any point.
 */
export function DeveloperIntro({ reduced, onFinish }: DeveloperIntroProps) {
  const [leaving, setLeaving] = useState(false);
  const leavingRef = useRef(false);

  /** Fast exit shared by skip, Escape and the reduced-motion path. */
  const beginLeave = useCallback(
    (fadeSeconds: number) => {
      if (leavingRef.current) return;
      leavingRef.current = true;
      document.documentElement.removeAttribute(INTRO_HTML_ATTR);
      setLeaving(true);
      window.setTimeout(onFinish, fadeSeconds * 1000);
    },
    [onFinish],
  );

  // Swap the static pre-paint cover for this overlay before the next paint.
  useLayoutEffect(() => {
    document.documentElement.setAttribute(INTRO_HTML_ATTR, "playing");
  }, []);

  // Timeline bookends + scroll lock + Escape-to-skip.
  useEffect(() => {
    const html = document.documentElement;
    const timers: number[] = [];

    if (reduced) {
      timers.push(
        window.setTimeout(
          () => beginLeave(INTRO_SKIP_EXIT_S),
          INTRO_REDUCED_HOLD_S * 1000,
        ),
      );
    } else {
      // Release the page entrance animations as the reveal begins…
      timers.push(
        window.setTimeout(() => {
          leavingRef.current = true; // exit underway — ignore late skips
          html.removeAttribute(INTRO_HTML_ATTR);
        }, INTRO_TIMELINE.exit.at * 1000),
      );
      // …and unmount once the overlay has fully faded.
      timers.push(window.setTimeout(onFinish, INTRO_TIMELINE.total * 1000));
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") beginLeave(INTRO_SKIP_EXIT_S);
    };
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      html.removeAttribute(INTRO_HTML_ATTR);
    };
  }, [reduced, beginLeave, onFinish]);

  const name = profile.name.toUpperCase();

  return (
    <div
      className="intro-overlay"
      style={introCssVars()}
      data-leaving={leaving || undefined}
      data-reduced={reduced || undefined}
    >
      {/* Everything visual is decorative — the real page is underneath. */}
      <div className="intro-stage" aria-hidden="true">
        {!reduced && (
          <>
            {/* Phase 1 — ambient glow + dust. */}
            <div className="intro-ambient" />
            <Particles />
            {/* Phase 2 — beam and streak field. */}
            <LightStreaks />
          </>
        )}

        {/* Phases 3–4 — logo assembles, then the name tracks in. */}
        <div className="intro-lockup">
          <div className="intro-logo-wrap">
            <DeveloperLogo />
          </div>
          <div className="intro-name">
            {Array.from(name).map((char, i) =>
              char === " " ? (
                <span key={i} className="intro-name-gap" />
              ) : (
                <span
                  key={i}
                  className="intro-letter"
                  style={{
                    animationDelay: `calc(var(--intro-name-at) + ${
                      i * INTRO_LETTER_STAGGER_S
                    }s)`,
                  }}
                >
                  {char}
                </span>
              ),
            )}
          </div>
          <p className="intro-role">{profile.title}</p>
        </div>

        {/* Static vignette for depth. */}
        <div className="intro-vignette" />
      </div>

      {!reduced && (
        <button
          type="button"
          className="intro-skip"
          onClick={() => beginLeave(INTRO_SKIP_EXIT_S)}
        >
          Skip intro <kbd>Esc</kbd>
        </button>
      )}
    </div>
  );
}
