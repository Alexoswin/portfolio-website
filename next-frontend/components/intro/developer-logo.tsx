import type { CSSProperties } from "react";

/**
 * Per-stroke draw schedule, in seconds after the logo phase begins.
 * Strokes overlap slightly so the mark feels assembled by one continuous
 * current of energy rather than drawn part by part.
 */
const DRAW = {
  hexagon: { delay: 0, dur: 1.0 },
  brackets: { delay: 0.4, dur: 0.8 },
  slash: { delay: 0.55, dur: 0.7 },
  nodes: { delay: 1.0, dur: 0.3 },
} as const;

/** Flat-top hexagon, radius 46 around (60,60) in the 120×120 viewBox. */
const HEXAGON_PATH =
  "M106 60 L83 99.8 L37 99.8 L14 60 L37 20.2 L83 20.2 Z";

const drawVars = (t: { delay: number; dur: number }) =>
  ({
    "--draw-delay": `${t.delay}s`,
    "--draw-dur": `${t.dur}s`,
  }) as CSSProperties;

/** Every stroke uses pathLength=1 so dash offsets need no measured lengths. */
function LogoStrokes({ className }: { className?: string }) {
  return (
    <g
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        className="intro-logo-draw"
        style={drawVars(DRAW.hexagon)}
        d={HEXAGON_PATH}
        pathLength={1}
        stroke="url(#intro-logo-hex)"
        strokeWidth={2.5}
      />
      <path
        className="intro-logo-draw"
        style={drawVars(DRAW.brackets)}
        d="M47 46 L33 60 L47 74"
        pathLength={1}
        stroke="var(--intro-c1)"
        strokeWidth={3.5}
      />
      <path
        className="intro-logo-draw"
        style={drawVars(DRAW.brackets)}
        d="M73 46 L87 60 L73 74"
        pathLength={1}
        stroke="var(--intro-c1)"
        strokeWidth={3.5}
      />
      <path
        className="intro-logo-draw"
        style={drawVars(DRAW.slash)}
        d="M66 42 L54 78"
        pathLength={1}
        stroke="url(#intro-logo-slash)"
        strokeWidth={3.5}
      />
    </g>
  );
}

/**
 * Phase 3–4 mark: a circuit-inspired hexagon enclosing `</>`, assembled
 * from animated strokes (stroke-dashoffset line drawing) rather than a
 * fade-in. Rendered twice — a blurred copy underneath provides the bloom
 * and carries the phase-4 pulse, the crisp copy sits on top. Vertex nodes
 * pop in last, like a circuit powering up.
 */
export function DeveloperLogo() {
  return (
    <svg
      className="intro-logo"
      viewBox="0 0 120 120"
      role="img"
      aria-label="Oswin Alex logo"
    >
      <defs>
        <linearGradient id="intro-logo-hex" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--intro-c1)" />
          <stop offset="100%" stopColor="var(--intro-c2)" />
        </linearGradient>
        <linearGradient id="intro-logo-slash" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--intro-c2)" />
          <stop offset="100%" stopColor="var(--intro-c3)" />
        </linearGradient>
        <filter id="intro-logo-bloom" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
      </defs>

      {/* Bloom layer — blurred duplicate; its opacity pulses in phase 4. */}
      <g className="intro-logo-glow" filter="url(#intro-logo-bloom)">
        <LogoStrokes />
      </g>

      {/* Crisp layer. */}
      <LogoStrokes />

      {/* Circuit nodes on the hexagon vertices. */}
      <g fill="var(--intro-c1)">
        {[
          [106, 60],
          [83, 99.8],
          [37, 99.8],
          [14, 60],
          [37, 20.2],
          [83, 20.2],
        ].map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            className="intro-logo-node"
            style={drawVars(DRAW.nodes)}
            cx={cx}
            cy={cy}
            r={2.4}
          />
        ))}
      </g>
    </svg>
  );
}
