"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { FileText, Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/profile";
import { siteConfig } from "@/lib/site";
import { BrandMark } from "@/components/ui/brand-mark";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight the section crossing the middle of the viewport.
  React.useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }
    const sections = siteConfig.sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/blogs") return pathname.startsWith("/blogs");
    return pathname === "/" && href === `/#${activeSection}`;
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        scrolled || isOpen
          ? "glass border-b shadow-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${profile.name} — home`}
        >
          <BrandMark
            id="brand-nav"
            className="h-8 w-8 transition-transform duration-300 group-hover:rotate-6"
          />
          <span className="hidden text-[15px] font-semibold tracking-tight sm:inline">
            {profile.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive(item.href) ? "true" : undefined}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
          <span className="mx-2 h-5 w-px bg-border" aria-hidden="true" />
          <a
            href={profile.contact.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            Resume
          </a>
          <ThemeToggle className="ml-1" />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu — animates via grid-rows so it works without JS-driven animation. */}
      <div
        id="mobile-nav"
        inert={!isOpen || undefined}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Mobile"
            className="flex flex-col gap-1 border-t border-border/60 px-5 py-4"
          >
            {siteConfig.nav.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                style={{ transitionDelay: `${index * 30}ms` }}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-base font-medium transition-[color,background-color,opacity,translate] duration-300",
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0",
                  isActive(item.href)
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
            <a
              href={profile.contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-1 inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

/** Star field for the sunset pass — position, entrance delay and size. */
const CELESTIAL_STARS = [
  { top: "8%", left: "55%", delay: 0.05, size: 3 },
  { top: "12%", left: "18%", delay: 0.15, size: 2 },
  { top: "16%", left: "88%", delay: 0.2, size: 3.5 },
  { top: "22%", left: "72%", delay: 0.3, size: 2 },
  { top: "6%", left: "30%", delay: 0.35, size: 2.5 },
  { top: "30%", left: "38%", delay: 0.4, size: 3 },
  { top: "38%", left: "10%", delay: 0.5, size: 2 },
  { top: "10%", left: "70%", delay: 0.45, size: 2 },
  { top: "26%", left: "8%", delay: 0.25, size: 3 },
  { top: "34%", left: "90%", delay: 0.55, size: 2.5 },
];

/**
 * Clouds drifting across the pass. `layer` decides paint order around the
 * rising body: "back" clouds sit behind it, "front" clouds sweep over it.
 * `drift` is the total horizontal travel in px (negative drifts leftwards);
 * `shape` picks one of the two silhouettes, `flip` mirrors it.
 */
const CELESTIAL_CLOUDS = [
  {
    top: "7%",
    left: "-14%",
    width: 240,
    drift: 96,
    opacity: 0.72,
    layer: "back",
    shape: "b",
    flip: false,
  },
  {
    top: "26%",
    left: "58%",
    width: 280,
    drift: -112,
    opacity: 0.62,
    layer: "back",
    shape: "a",
    flip: true,
  },
  {
    top: "60%",
    left: "12%",
    width: 190,
    drift: 74,
    opacity: 0.5,
    layer: "back",
    shape: "b",
    flip: true,
  },
  {
    top: "38%",
    left: "-8%",
    width: 330,
    drift: 170,
    opacity: 0.95,
    layer: "front",
    shape: "a",
    flip: false,
  },
  // Clips the lower half of the risen body, so it reads as sky with depth.
  {
    top: "55%",
    left: "33%",
    width: 300,
    drift: 150,
    opacity: 0.88,
    layer: "front",
    shape: "a",
    flip: true,
  },
  {
    top: "52%",
    left: "64%",
    width: 230,
    drift: -140,
    opacity: 0.88,
    layer: "front",
    shape: "b",
    flip: false,
  },
] as const;

/**
 * Symbol library for the pass — one shared cloud gradient (userSpaceOnUse so
 * the lobes of a cloud sample one continuous ramp rather than each getting
 * its own) and the two cloud silhouettes every instance draws with `<use>`.
 */
function CelestialDefs() {
  return (
    <svg className="celestial-defs" aria-hidden="true">
      <defs>
        {/*
          A cloud is a pile of overlapping lobes, and each lobe antialiases
          against transparency before they composite — which leaves pale
          seams where two edges run close together. Pushing alpha up the
          table collapses those partial coverages back to solid; the CSS
          blur on the span puts the soft edge back.
        */}
        <filter id="celestial-cloud-solid" colorInterpolationFilters="sRGB">
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 1 1" />
          </feComponentTransfer>
        </filter>

        <linearGradient
          id="celestial-cloud-fill"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="6"
          x2="0"
          y2="94"
        >
          <stop offset="0" className="celestial-cloud-top" />
          <stop offset="1" className="celestial-cloud-bottom" />
        </linearGradient>

        {/* Cumulus — tall crown, flat base. */}
        <symbol id="celestial-cloud-a" viewBox="0 0 200 96">
          <g
            fill="url(#celestial-cloud-fill)"
            filter="url(#celestial-cloud-solid)"
          >
            <rect x="12" y="56" width="176" height="34" rx="17" />
            <circle cx="92" cy="44" r="34" />
            <circle cx="56" cy="56" r="24" />
            <circle cx="134" cy="54" r="26" />
            <circle cx="30" cy="66" r="15" />
            <circle cx="168" cy="64" r="17" />
          </g>
        </symbol>

        {/* Stratocumulus — longer and lower, for the distance. */}
        <symbol id="celestial-cloud-b" viewBox="0 0 200 96">
          <g
            fill="url(#celestial-cloud-fill)"
            filter="url(#celestial-cloud-solid)"
          >
            <rect x="6" y="62" width="188" height="28" rx="14" />
            <circle cx="104" cy="44" r="26" />
            <circle cx="60" cy="52" r="22" />
            <circle cx="146" cy="54" r="20" />
            <circle cx="26" cy="62" r="13" />
            <circle cx="176" cy="62" r="14" />
          </g>
        </symbol>
      </defs>
    </svg>
  );
}

function CelestialClouds({ layer }: { layer: "front" | "back" }) {
  return (
    <>
      {CELESTIAL_CLOUDS.filter((cloud) => cloud.layer === layer).map(
        (cloud) => (
          <span
            key={`${cloud.top}-${cloud.left}`}
            className="celestial-cloud"
            data-layer={cloud.layer}
            data-flip={cloud.flip}
            style={
              {
                top: cloud.top,
                left: cloud.left,
                "--cloud-w": `${cloud.width}px`,
                "--cloud-drift": `${cloud.drift}px`,
                "--cloud-opacity": cloud.opacity,
              } as React.CSSProperties
            }
          >
            <svg viewBox="0 0 200 96">
              <use href={`#celestial-cloud-${cloud.shape}`} />
            </svg>
          </span>
        ),
      )}
    </>
  );
}

/**
 * Renders both icons and lets CSS pick one based on `data-theme`, so there is
 * no mounted-state flash and no hydration mismatch. Switching themes plays a
 * celestial pass: an opaque sky overlay fades in over the page, a sun (light)
 * or crescent moon with stars (dark) rises across it while clouds drift past
 * in front of and behind it, and the sky fades out
 * to reveal the retinted page. The theme itself flips in the same React
 * commit that mounts the overlay, so the swap is never seen directly.
 * Reduced motion gets an instant swap.
 */
function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [celestial, setCelestial] = React.useState<{
    kind: "sun" | "moon";
    id: number;
  } | null>(null);

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion) {
      setCelestial({ kind: next === "light" ? "sun" : "moon", id: Date.now() });
    }
    setTheme(next);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={cn(
          "rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
          className,
        )}
      >
        <Sun className="hidden h-5 w-5 dark:block" aria-hidden="true" />
        <Moon className="h-5 w-5 dark:hidden" aria-hidden="true" />
      </button>

      {celestial &&
        createPortal(
          <span
            key={celestial.id}
            aria-hidden="true"
            className={cn(
              "celestial-overlay",
              celestial.kind === "sun" ? "celestial-sun" : "celestial-moon",
            )}
            onAnimationEnd={(event) => {
              // Child animations bubble; only the overlay's own fade unmounts it.
              if (event.target === event.currentTarget) setCelestial(null);
            }}
          >
            <CelestialDefs />
            <CelestialClouds layer="back" />
            {celestial.kind === "sun" ? (
              <span className="celestial-body" />
            ) : (
              /* Crescent via SVG mask — exact geometry, real transparency,
                 and drop-shadow follows the crescent's alpha reliably. The
                 wide halo lives on the wrapper's ::after instead of a second
                 drop-shadow, which the SVG's filter region would square off. */
              <span className="celestial-body celestial-moon-body">
                <svg viewBox="0 0 100 100">
                  <defs>
                    <mask id="celestial-crescent">
                      <circle cx="50" cy="50" r="44" fill="#fff" />
                      <circle cx="70" cy="42" r="40" fill="#000" />
                    </mask>
                  </defs>
                  <g mask="url(#celestial-crescent)">
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      className="celestial-moon-disc"
                    />
                    {/* Maria, placed inside the lit limb so the mask keeps them. */}
                    <circle
                      cx="27"
                      cy="63"
                      r="7.5"
                      className="celestial-moon-crater"
                    />
                    <circle
                      cx="20"
                      cy="39"
                      r="5"
                      className="celestial-moon-crater"
                    />
                    <circle
                      cx="35"
                      cy="76"
                      r="4"
                      className="celestial-moon-crater"
                    />
                    <circle
                      cx="14"
                      cy="53"
                      r="3.2"
                      className="celestial-moon-crater"
                    />
                  </g>
                </svg>
              </span>
            )}
            {celestial.kind === "moon" &&
              CELESTIAL_STARS.map((star) => (
                <span
                  key={`${star.top}-${star.left}`}
                  className="celestial-star"
                  data-flare={star.size >= 3}
                  style={{
                    top: star.top,
                    left: star.left,
                    width: star.size,
                    height: star.size,
                    animationDelay: `${star.delay}s`,
                  }}
                />
              ))}
            <CelestialClouds layer="front" />
          </span>,
          document.body,
        )}
    </>
  );
}
