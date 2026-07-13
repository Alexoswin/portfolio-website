/**
 * The site's brand mark: a circuit-inspired hexagon enclosing `</>`.
 * Single source of the geometry — the cinematic intro draws these exact
 * paths stroke by stroke (components/intro/developer-logo.tsx), the navbar
 * and project banners render them statically here, and app/icon.svg mirrors
 * them for the favicon.
 */

/** Path data in a 120×120 viewBox. */
export const BRAND_PATHS = {
  /** Flat-top hexagon, radius 46 around (60,60). */
  hexagon: "M106 60 L83 99.8 L37 99.8 L14 60 L37 20.2 L83 20.2 Z",
  bracketLeft: "M47 46 L33 60 L47 74",
  bracketRight: "M73 46 L87 60 L73 74",
  slash: "M66 42 L54 78",
} as const;

/** Hexagon vertices — the intro pops circuit nodes onto these. */
export const BRAND_HEX_VERTICES = [
  [106, 60],
  [83, 99.8],
  [37, 99.8],
  [14, 60],
  [37, 20.2],
  [83, 20.2],
] as const;

interface BrandMarkProps {
  className?: string;
  /**
   * Unique prefix for the internal gradient ids — pass a distinct value when
   * the mark appears more than once on a page.
   */
  id?: string;
}

/**
 * Static render of the mark, colored with the theme's glow tokens so it
 * adapts to light/dark like the rest of the site. Decorative by default —
 * pair it with visible text (as the navbar does) for its accessible name.
 */
export function BrandMark({ className, id = "brand-mark" }: BrandMarkProps) {
  const hexId = `${id}-hex`;
  const slashId = `${id}-slash`;

  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={hexId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--glow-1)" />
          <stop offset="100%" stopColor="var(--glow-2)" />
        </linearGradient>
        <linearGradient id={slashId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glow-2)" />
          <stop offset="100%" stopColor="var(--glow-3)" />
        </linearGradient>
      </defs>
      {/* Heavier strokes than the intro's — this renders as small as 32px. */}
      <path d={BRAND_PATHS.hexagon} stroke={`url(#${hexId})`} strokeWidth={6} />
      <path d={BRAND_PATHS.bracketLeft} stroke="var(--glow-1)" strokeWidth={8} />
      <path d={BRAND_PATHS.bracketRight} stroke="var(--glow-1)" strokeWidth={8} />
      <path d={BRAND_PATHS.slash} stroke={`url(#${slashId})`} strokeWidth={8} />
    </svg>
  );
}
