"use client";

import * as React from "react";
import { m, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  if (!mounted) return null;

  return (
    <m.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-[60] origin-left"
      style={{ scaleX }}
    />
  );
}
