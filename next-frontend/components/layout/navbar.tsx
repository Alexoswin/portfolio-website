"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { FileText, Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/profile";
import { siteConfig } from "@/lib/site";

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
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-(--glow-1) to-(--glow-2) font-mono text-sm font-bold text-white shadow-sm transition-transform duration-300 group-hover:rotate-6">
            {profile.name.charAt(0)}
          </span>
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
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
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

/**
 * Renders both icons and lets CSS pick one based on `data-theme`, so there is
 * no mounted-state flash and no hydration mismatch. Switching themes plays a
 * circular reveal from the button via the View Transitions API, falling back
 * to an instant swap on unsupported browsers or reduced motion.
 */
function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const button = buttonRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!document.startViewTransition || prefersReducedMotion || !button) {
      setTheme(next);
      return;
    }

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 550,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {
        // Transition was skipped (e.g. rapid toggling) — theme still applied.
      });
  };

  return (
    <button
      ref={buttonRef}
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
  );
}
