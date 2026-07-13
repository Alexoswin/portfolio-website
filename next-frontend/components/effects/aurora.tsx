/**
 * Ambient page background: drifting aurora glows over a masked hex lattice.
 * Pure CSS (transform-only keyframes, GPU-composited) — ships zero JS.
 */
export function Aurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Nested: the hex pattern is itself a mask, so the edge fade must
          live on a wrapper — both on one element would override each other. */}
      <div className="mask-fade-edges absolute inset-0">
        <div className="bg-hex-grid absolute inset-0" />
      </div>

      <div
        className="animate-aurora absolute -top-[20%] left-[8%] h-[55vh] w-[42vw] min-w-80 rounded-full opacity-(--aurora-opacity) blur-[110px] will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, var(--glow-1), transparent 70%)",
        }}
      />
      <div
        className="animate-aurora absolute top-[30%] -right-[12%] h-[60vh] w-[45vw] min-w-80 rounded-full opacity-(--aurora-opacity) blur-[120px] will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, var(--glow-2), transparent 70%)",
          animationDuration: "30s",
          animationDelay: "-8s",
        }}
      />
      <div
        className="animate-aurora absolute -bottom-[25%] left-[30%] h-[50vh] w-[40vw] min-w-72 rounded-full opacity-(--aurora-opacity) blur-[130px] will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, var(--glow-3), transparent 70%)",
          animationDuration: "36s",
          animationDelay: "-16s",
        }}
      />
    </div>
  );
}
