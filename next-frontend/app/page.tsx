import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { MotionProvider } from "@/components/motion-provider";
import { ScrollProgress } from "../components/ui/scroll-progress";
import { Footer } from "@/components/footer";

// Export unstable_instant for Next.js 16 performance optimizations
// export const unstable_instant = { prefetch: "static" };

// Lazy load sections below the fold
const Experience = dynamic(
  () =>
    import("@/components/sections/experience").then((mod) => mod.Experience),
  {
    loading: () => <div className="min-h-[400px]" />,
    ssr: true,
  },
);

const Projects = dynamic(
  () => import("@/components/sections/projects").then((mod) => mod.Projects),
  {
    loading: () => <div className="min-h-[400px]" />,
    ssr: true,
  },
);

const Skills = dynamic(
  () => import("@/components/sections/skills").then((mod) => mod.Skills),
  {
    loading: () => <div className="min-h-[300px]" />,
    ssr: true,
  },
);

const EducationAndAwards = dynamic(
  () =>
    import("@/components/sections/education").then(
      (mod) => mod.EducationAndAwards,
    ),
  {
    loading: () => <div className="min-h-[300px]" />,
    ssr: true,
  },
);

const Contact = dynamic(
  () => import("@/components/sections/contact").then((mod) => mod.Contact),
  {
    loading: () => <div className="min-h-[300px]" />,
    ssr: true,
  },
);

export default function Home() {
  return (
    <MotionProvider>
      <main className="relative min-h-screen">
        <AnimatedGradient />
        <ScrollProgress />

        <Navbar />

        <div className="flex flex-col">
          <Hero />

          <div className="bg-gradient-to-b from-transparent via-background/50 to-background flex flex-col pt-20">
            <Suspense fallback={<div className="min-h-[400px]" />}>
              <Experience />
            </Suspense>

            <Suspense fallback={<div className="min-h-[400px]" />}>
              <Projects />
            </Suspense>

            <Suspense fallback={<div className="min-h-[300px]" />}>
              <Skills />
            </Suspense>

            <Suspense fallback={<div className="min-h-[300px]" />}>
              <EducationAndAwards />
            </Suspense>

            <Suspense fallback={<div className="min-h-[300px]" />}>
              <Contact />
            </Suspense>
          </div>
        </div>

        <Footer />
      </main>
    </MotionProvider>
  );
}
