const CUBE_SIZE = 56;

const cubeFaces = [
  `translateZ(${CUBE_SIZE / 2}px)`,
  `rotateY(180deg) translateZ(${CUBE_SIZE / 2}px)`,
  `rotateY(90deg) translateZ(${CUBE_SIZE / 2}px)`,
  `rotateY(-90deg) translateZ(${CUBE_SIZE / 2}px)`,
  `rotateX(90deg) translateZ(${CUBE_SIZE / 2}px)`,
  `rotateX(-90deg) translateZ(${CUBE_SIZE / 2}px)`,
];

/** Depth-layer wrapper: shifts with the pointer via --mpx/--mpy from <MouseParallax>. */
function ParallaxLayer({
  depth,
  className,
  children,
}: Readonly<{ depth: number; className: string; children: React.ReactNode }>) {
  return (
    <div
      className={className}
      style={{
        translate: `calc(var(--mpx, 0) * ${depth}px) calc(var(--mpy, 0) * ${depth}px)`,
        transition: "translate 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}

function DepthEntrance({
  delay,
  children,
}: Readonly<{ delay: string; children: React.ReactNode }>) {
  return (
    <div
      className="animate-depth-pop"
      style={{ animationDelay: delay, transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/**
 * Decorative 3D geometry floating in the hero — a spinning wireframe ring, a
 * rotating cube and glowing orbs, each on its own parallax depth. Pure CSS
 * transforms (GPU-composited, zero JS), including a first-render depth pop;
 * hidden on small screens.
 */
export function FloatingShapes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      {/* Wireframe ring */}
      <ParallaxLayer depth={-34} className="absolute top-[20%] right-[10%]">
        <DepthEntrance delay="0.08s">
          <div className="animate-float" style={{ animationDelay: "-2s" }}>
            <div
              className="animate-spin-ring h-40 w-40 rounded-full border-2 border-primary/30 lg:h-48 lg:w-48"
              style={{ transformStyle: "preserve-3d" }}
            />
          </div>
        </DepthEntrance>
      </ParallaxLayer>

      {/* Inner ring, counter depth */}
      <ParallaxLayer depth={-18} className="absolute top-[24%] right-[13%]">
        <DepthEntrance delay="0.2s">
          <div className="animate-float" style={{ animationDelay: "-4.5s" }}>
            <div
              className="animate-spin-ring h-24 w-24 rounded-full border border-secondary/40 lg:h-28 lg:w-28"
              style={{ transformStyle: "preserve-3d", animationDirection: "reverse" }}
            />
          </div>
        </DepthEntrance>
      </ParallaxLayer>

      {/* Rotating cube */}
      <ParallaxLayer depth={42} className="absolute bottom-[22%] left-[9%]">
        <DepthEntrance delay="0.16s">
          <div className="animate-float" style={{ animationDelay: "-3s" }}>
            <div
              className="animate-spin-cube relative"
              style={{
                width: CUBE_SIZE,
                height: CUBE_SIZE,
                transformStyle: "preserve-3d",
              }}
            >
              {cubeFaces.map((transform) => (
                <div
                  key={transform}
                  className="absolute inset-0 border border-secondary/40 bg-secondary/5 backdrop-blur-[1px]"
                  style={{ transform }}
                />
              ))}
            </div>
          </div>
        </DepthEntrance>
      </ParallaxLayer>

      {/* Glowing orbs at different depths */}
      <ParallaxLayer depth={26} className="absolute top-[30%] left-[16%]">
        <DepthEntrance delay="0.28s">
          <div
            className="animate-float h-5 w-5 rounded-full bg-gradient-to-br from-(--glow-1) to-(--glow-2) opacity-70 shadow-glow"
            style={{ animationDelay: "-5s" }}
          />
        </DepthEntrance>
      </ParallaxLayer>
      <ParallaxLayer depth={-12} className="absolute right-[22%] bottom-[28%]">
        <DepthEntrance delay="0.34s">
          <div
            className="animate-float h-3 w-3 rounded-full bg-gradient-to-br from-(--glow-2) to-(--glow-3) opacity-60"
            style={{ animationDelay: "-1.5s" }}
          />
        </DepthEntrance>
      </ParallaxLayer>
      <ParallaxLayer depth={14} className="absolute top-[58%] left-[26%]">
        <DepthEntrance delay="0.4s">
          <div
            className="animate-float h-2 w-2 rounded-full bg-(--glow-1) opacity-50"
            style={{ animationDelay: "-6s" }}
          />
        </DepthEntrance>
      </ParallaxLayer>
    </div>
  );
}
