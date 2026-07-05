import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { EducationAndAwards } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <EducationAndAwards />
      <Contact />
    </main>
  );
}
