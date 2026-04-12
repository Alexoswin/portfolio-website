"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeading({ children, subtitle, className, align = "left" }: Readonly<SectionHeadingProps>) {
  const alignClasses = {
    left: "text-left",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("flex flex-col gap-2 mb-12", alignClasses[align], className)}
    >
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
        {children}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mt-2" />
    </m.div>
  );
}
