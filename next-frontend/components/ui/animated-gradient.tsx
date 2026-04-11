"use client";

import { motion } from "framer-motion";

export function AnimatedGradient() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-background">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[10%] -left-[10%] h-[50%] w-[50%] rounded-full bg-primary/20 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-0 right-0 h-[60%] w-[60%] rounded-full bg-secondary/20 blur-[120px]"
      />
    </div>
  );
}
