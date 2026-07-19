import {
  Cloud,
  Code2,
  Database,
  Globe,
  Server,
  type LucideIcon,
} from "lucide-react";
import { profile } from "@/lib/profile";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/effects/reveal";

const categoryIcons: Record<string, LucideIcon> = {
  Languages: Code2,
  Backend: Server,
  Frontend: Globe,
  Databases: Database,
  "Cloud & Infra": Cloud,
};

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        id="skills-heading"
        eyebrow="Capabilities"
        title="Skills & Tools"
        subtitle="The technologies I reach for across the stack."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(profile.skills).map(([category, skills], index) => {
          const Icon = categoryIcons[category] ?? Code2;
          return (
            <Reveal key={category} delay={(index % 3) * 0.08}>
              <Card className="flex h-full flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <h3 className="font-semibold tracking-tight">{category}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border bg-background/60 px-3 py-1 text-sm text-muted-foreground transition-[color,border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary hover:shadow-[0_4px_12px_-6px] hover:shadow-primary/40"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
