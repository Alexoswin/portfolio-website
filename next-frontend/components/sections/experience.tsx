import { Briefcase, Calendar, MapPin } from "lucide-react";
import { profile } from "@/lib/profile";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/effects/reveal";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        id="experience-heading"
        eyebrow="Career"
        title="Work Experience"
        subtitle="My professional journey and industry experience."
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Timeline rail */}
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-primary/60 via-border to-transparent sm:left-[9px]"
        />

        <ol className="flex flex-col gap-10">
          {profile.experience.map((exp, index) => (
            <li key={`${exp.company}-${exp.role}`} className="relative pl-10 sm:pl-14">
              <span
                aria-hidden="true"
                className="absolute top-2 left-0 flex h-4 w-4 items-center justify-center rounded-full border border-primary/50 bg-background sm:h-5 sm:w-5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary sm:h-2 sm:w-2" />
              </span>

              <Reveal delay={index * 0.08}>
                <Card className="flex flex-col gap-5">
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xl font-semibold tracking-tight">
                        {exp.role}
                      </h3>
                      <p className="flex items-center gap-2 text-sm font-medium text-primary">
                        <Briefcase className="h-4 w-4" aria-hidden="true" />
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col gap-1 text-sm text-muted-foreground md:items-end">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2.5">
                    {exp.achievements.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-(--glow-1) to-(--glow-2)"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
