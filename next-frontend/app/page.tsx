"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { EducationAndAwards } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative min-h-screen">
      <AnimatedGradient />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <div className="flex flex-col">
        <Hero />
        <div className="bg-gradient-to-b from-transparent via-background/50 to-background flex flex-col pt-20">
          <Experience />
          <Projects />
          <Skills />
          <EducationAndAwards />
          <Contact />
        </div>
      </div>

      <footer className="border-t bg-muted/30 py-12">
        <div className="container px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Oswin Alex. Built with Next.js, Tailwind CSS and Framer Motion.
          </p>
        </div>
      </footer>
    </main>
  );
}
