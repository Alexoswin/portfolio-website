import { ArrowUpRight, Award, GraduationCap, MapPin, Trophy } from "lucide-react";
import { profile } from "@/lib/profile";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/effects/reveal";

export function EducationAndAwards() {
  return (
    <Section id="education">
      <SectionHeading
        id="education-heading"
        eyebrow="Background"
        title="Education & Achievements"
        subtitle="Academic foundations, certifications, and recognition along the way."
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <h3 className="eyebrow">Education</h3>
            {profile.education.map((edu, index) => (
              <Reveal key={edu.institution} delay={index * 0.08}>
                <Card className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-semibold tracking-tight">
                      {edu.institution}
                    </h4>
                    <p className="text-sm font-medium text-secondary">
                      {edu.degree}
                    </p>
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span>{edu.period}</span>
                      <span aria-hidden="true">·</span>
                      <span>{edu.grade}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {edu.location}
                      </span>
                    </p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="eyebrow">Certifications</h3>
            {profile.certifications.map((cert, index) => (
              <Reveal key={cert.name} delay={index * 0.08}>
                <Card className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-semibold tracking-tight">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer} · {cert.date}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {cert.details}
                    </p>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link mt-1 inline-flex w-fit items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Verify credential
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="eyebrow">Achievements</h3>
          {profile.achievements.map((award, index) => (
            <Reveal key={award.title} delay={index * 0.08}>
              <Card className="relative flex flex-col gap-2.5 pl-7">
                <span
                  aria-hidden="true"
                  className="absolute top-6 bottom-6 left-0 w-1 rounded-r-full bg-gradient-to-b from-(--glow-1) to-(--glow-2)"
                />
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-lg leading-snug font-semibold tracking-tight">
                    {award.title}
                  </h4>
                  <Trophy
                    className="mt-1 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-sm font-medium text-primary">
                  {award.event}
                  <span className="ml-2 font-normal text-muted-foreground">
                    {award.date}
                  </span>
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {award.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
