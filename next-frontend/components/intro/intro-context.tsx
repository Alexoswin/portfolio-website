"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion";
import { INTRO_HTML_ATTR, INTRO_SESSION_KEY } from "./intro-config";
import { DeveloperIntro } from "./developer-intro";

/**
 * - "idle"    — SSR / hydration render, decision not made yet
 * - "playing" — overlay is on screen (full or reduced-motion variant)
 * - "done"    — intro finished, skipped, or already seen this session
 */
export type IntroStatus = "idle" | "playing" | "done";

interface IntroContextValue {
  status: IntroStatus;
  /** True once the page is (or always was) fully interactive. */
  isDone: boolean;
}

const IntroContext = createContext<IntroContextValue>({
  status: "done",
  isDone: true,
});

/** Read intro state anywhere — e.g. to hold work until the intro finishes. */
export function useIntro(): IntroContextValue {
  return useContext(IntroContext);
}

const subscribeNever = () => () => {};

/**
 * Whether the pre-paint IntroScript armed the intro for this page load.
 * Latched on first read so the answer stays stable for the whole lifetime
 * of the page (the overlay clears the attribute mid-flight; SPA navigations
 * must not re-trigger playback).
 */
let armedThisPageLoad: boolean | undefined;
const getArmedSnapshot = () => {
  armedThisPageLoad ??=
    document.documentElement.getAttribute(INTRO_HTML_ATTR) === "pending";
  return armedThisPageLoad;
};

/**
 * Decides once per browser session whether the cinematic intro plays and
 * mounts the overlay above the app. The server renders children only, so
 * SEO and hydration are untouched; the inline `IntroScript` bridges the
 * pre-hydration gap with a plain CSS cover.
 */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  // Server snapshot is `false`, so SSR/hydration render no overlay; React
  // re-renders with the real answer immediately after hydration.
  const armed = useSyncExternalStore(
    subscribeNever,
    getArmedSnapshot,
    () => false,
  );
  const [dismissed, setDismissed] = useState(false);
  const reduced = usePrefersReducedMotion();

  const playing = armed && !dismissed;
  const status: IntroStatus = playing ? "playing" : "done";

  // Flag the session as seen when playback *starts*, not when it ends —
  // a reload mid-intro should not replay it.
  useEffect(() => {
    if (!playing) return;
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch {
      // Storage unavailable (privacy mode) — the intro just replays next visit.
    }
  }, [playing]);

  const finish = useCallback(() => setDismissed(true), []);

  const value = useMemo<IntroContextValue>(
    () => ({ status, isDone: !playing }),
    [status, playing],
  );

  return (
    <IntroContext.Provider value={value}>
      {children}
      {playing && <DeveloperIntro reduced={reduced} onFinish={finish} />}
    </IntroContext.Provider>
  );
}
