"use client";

import { useEffect, useRef } from "react";
import { INTRO_COLORS, INTRO_TIMELINE } from "./intro-config";

interface IntroParticle {
  x: number;
  y: number;
  /** Depth 0..1 — scales size, speed and brightness for parallax feel. */
  z: number;
  vx: number;
  vy: number;
  color: string;
}

/** Upper bound; the real count adapts to viewport area. */
const MAX_PARTICLES = 90;
/** Only particles inside this radius (vmin-relative) join the logo orbit. */
const ORBIT_RADIUS_FACTOR = 0.42;
/** Tangential orbit speed in px/frame at z=1. */
const ORBIT_SPEED = 1.6;

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
};

/**
 * Full-screen drifting dust for the intro. Time-based (not frame-based) so
 * it stays in sync with the CSS timeline: particles fade in during the
 * ambient phase, drift slowly upward, then briefly orbit the screen center
 * while the logo pulses (phase 4). Runs on a 2D canvas at devicePixelRatio
 * ≤ 2 — transform/alpha work only, no layout. The parent overlay fades the
 * whole canvas out, so no exit logic is needed here.
 */
export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let particles: IntroParticle[] = [];
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(28, Math.min(MAX_PARTICLES, (width * height) / 22000));
      particles = Array.from({ length: Math.round(count) }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: 0.25 + Math.random() * 0.75,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -0.1 - Math.random() * 0.28, // gentle upward drift
        // Mostly cyan dust with indigo/violet strays for depth.
        color:
          i % 5 === 0 ? INTRO_COLORS.c2 : i % 11 === 0 ? INTRO_COLORS.c3 : INTRO_COLORS.c1,
      }));
    };

    const step = (now: number) => {
      const elapsed = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      // Phase 1: the field breathes in with the ambient glow.
      const fieldAlpha = smoothstep(
        INTRO_TIMELINE.ambient.at,
        INTRO_TIMELINE.ambient.at + INTRO_TIMELINE.ambient.dur,
        elapsed,
      );

      // Phase 4: orbit influence ramps in and back out with the pulse.
      const pulseEnd = INTRO_TIMELINE.pulse.at + INTRO_TIMELINE.pulse.dur;
      const orbit =
        smoothstep(INTRO_TIMELINE.pulse.at, INTRO_TIMELINE.pulse.at + 0.3, elapsed) *
        (1 - smoothstep(pulseEnd, pulseEnd + 0.4, elapsed));

      const cx = width / 2;
      const cy = height / 2;
      const orbitRadius = Math.min(width, height) * ORBIT_RADIUS_FACTOR;

      for (const p of particles) {
        let vx = p.vx * p.z;
        let vy = p.vy * p.z;

        if (orbit > 0) {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < orbitRadius) {
            // Blend drift toward a tangential path with a slight inward pull.
            const w = orbit * (1 - dist / orbitRadius);
            vx = vx * (1 - w) + ((-dy / dist) * ORBIT_SPEED * p.z - (dx / dist) * 0.2) * w;
            vy = vy * (1 - w) + ((dx / dist) * ORBIT_SPEED * p.z - (dy / dist) * 0.2) * w;
          }
        }

        p.x += vx;
        p.y += vy;

        if (p.x < -12) p.x = width + 12;
        if (p.x > width + 12) p.x = -12;
        if (p.y < -12) p.y = height + 12;
        if (p.y > height + 12) p.y = -12;

        ctx.globalAlpha = fieldAlpha * (0.16 + p.z * 0.5);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.6 + p.z * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(step);
    };

    resize();
    raf = requestAnimationFrame(step);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
