"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  /** Depth 0..1 — scales size, speed and pointer parallax for a 3D feel. */
  z: number;
  vx: number;
  vy: number;
  /** Click-burst impulse, decays back to the base drift each frame. */
  ix: number;
  iy: number;
  /** 1..0 for short-lived click sparks; undefined = permanent particle. */
  life?: number;
}

interface Ripple {
  x: number;
  y: number;
  start: number;
}

interface ParticleFieldProps {
  className?: string;
  /** Upper bound — the actual count adapts to canvas area and device cores. */
  quantity?: number;
}

const LINK_DISTANCE = 110;
const POINTER_RADIUS = 140;
const BURST_RADIUS = 200;
const RIPPLE_DURATION = 700;
/** Width of the expanding shockwave band that pushes particles. */
const WAVE_BAND = 28;

/**
 * Depth-layered particle constellation on a 2D canvas with pointer parallax.
 * Skipped entirely under prefers-reduced-motion; pauses when offscreen or the
 * tab is hidden; particle density adapts to viewport area and CPU cores.
 */
export function ParticleField({ className, quantity = 90 }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let running = false;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const ripples: Ripple[] = [];
    const pointer = { x: Number.NaN, y: Number.NaN };
    let dotColor = "#7dd3fc";

    const readThemeColor = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--particle")
        .trim();
      if (value) dotColor = value;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cores = navigator.hardwareConcurrency ?? 4;
      const budget = cores <= 4 ? 0.6 : 1;
      const count = Math.round(
        Math.min(quantity, (width * height) / 14000) * budget,
      );
      particles = Array.from({ length: Math.max(count, 24) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: 0.25 + Math.random() * 0.75,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        ix: 0,
        iy: 0,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      const parallaxX = Number.isNaN(pointer.x) ? 0 : (pointer.x - width / 2) / width;
      const parallaxY = Number.isNaN(pointer.y) ? 0 : (pointer.y - height / 2) / height;

      // Retire expired click sparks before physics.
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.life !== undefined && (p.life -= 0.016) <= 0) {
          particles.splice(i, 1);
        }
      }

      for (const p of particles) {
        p.x += p.vx * p.z + p.ix;
        p.y += p.vy * p.z + p.iy;
        p.ix *= 0.9;
        p.iy *= 0.9;
        // Sparks fire off fast, then drag to a drift as they fade.
        if (p.life !== undefined) {
          p.vx *= 0.96;
          p.vy *= 0.96;
        }

        // Gentle repulsion around the pointer.
        if (!Number.isNaN(pointer.x)) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < POINTER_RADIUS && dist > 0) {
            const force = ((POINTER_RADIUS - dist) / POINTER_RADIUS) * 0.4;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      ctx.fillStyle = dotColor;
      ctx.strokeStyle = dotColor;

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const ax = a.x + parallaxX * 24 * a.z;
        const ay = a.y + parallaxY * 24 * a.z;

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = ax - (b.x + parallaxX * 24 * b.z);
          const dy = ay - (b.y + parallaxY * 24 * b.z);
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            ctx.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.16;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(b.x + parallaxX * 24 * b.z, b.y + parallaxY * 24 * b.z);
            ctx.stroke();
          }
        }

        if (a.life !== undefined) {
          // Sparks render as motion streaks along their velocity.
          ctx.globalAlpha = 0.85 * a.life;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(ax - a.vx * 5, ay - a.vy * 5);
          ctx.lineTo(ax, ay);
          ctx.stroke();
          ctx.lineWidth = 1;
        } else {
          ctx.globalAlpha = 0.3 + a.z * 0.45;
          ctx.beginPath();
          ctx.arc(ax, ay, 0.8 + a.z * 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Click ripples — center flash + double ring, with a shockwave band
      // that pushes particles outward as the ring sweeps past them.
      const now = performance.now();
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        const progress = (now - ripple.start) / RIPPLE_DURATION;
        if (progress >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        const eased = 1 - (1 - progress) ** 3;
        const ringRadius = eased * BURST_RADIUS;

        for (const p of particles) {
          const dx = p.x - ripple.x;
          const dy = p.y - ripple.y;
          const dist = Math.hypot(dx, dy);
          const band = Math.abs(dist - ringRadius);
          if (band < WAVE_BAND && dist > 1) {
            const force = (1 - band / WAVE_BAND) * (1 - progress) * 1.7;
            p.ix += (dx / dist) * force;
            p.iy += (dy / dist) * force;
          }
        }

        // Brief glow flash at the press point.
        if (progress < 0.45) {
          const flash = progress / 0.45;
          ctx.globalAlpha = 0.2 * (1 - flash);
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, 18 + flash * 70, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.35 * (1 - progress);
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Trailing inner ring gives the wave visible thickness.
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.18 * (1 - progress);
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ringRadius * 0.7, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = Number.NaN;
      pointer.y = Number.NaN;
    };
    const onPointerDown = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > width || y > height) return;

      ripples.push({ x, y, start: performance.now() });

      // The expanding shockwave (see step) scatters existing particles;
      // here we only launch sparks — capped so click spam can't grow the field.
      const sparks = Math.min(14, Math.max(0, quantity + 50 - particles.length));
      for (let i = 0; i < sparks; i++) {
        const angle = (Math.PI * 2 * i) / sparks + Math.random() * 0.5;
        const speed = 1.6 + Math.random() * 2.2;
        particles.push({
          x,
          y,
          z: 0.4 + Math.random() * 0.6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          ix: 0,
          iy: 0,
          life: 1,
        });
      }
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };

    let inView = true;
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView && !document.hidden) start();
      else stop();
    });

    const themeObserver = new MutationObserver(readThemeColor);

    readThemeColor();
    resize();
    start();

    observer.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("blur", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("blur", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [quantity]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
