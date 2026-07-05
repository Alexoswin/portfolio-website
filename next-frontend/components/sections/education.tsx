"use client";

import { profile } from "@/lib/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Award, GraduationCap, Trophy } from "lucide-react";
import { m } from "framer-motion";

export function EducationAndAwards() {
  return (
    <section id="education" className="container px-4 py-24 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <SectionHeading subtitle="My academic background and qualifications.">
            Education
          </SectionHeading>
          <div className="grid gap-6 mt-8">
            {profile.education.map((edu, index) => (
              <Card key={index} delay={index * 0.1} className="flex gap-4 items-start">
                <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">{edu.institution}</h3>
                  <p className="text-secondary font-medium text-sm">{edu.degree}</p>
                  <p className="text-muted-foreground text-xs mt-1">{edu.period} • {edu.grade}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <SectionHeading subtitle="Key professional certifications.">
              Certifications
            </SectionHeading>
            <div className="grid gap-4 mt-8">
              {profile.certifications.map((cert, index) => (
                <Card key={index} delay={index * 0.1} className="flex gap-4 items-start">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent mt-1">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{cert.name}</h3>
                    <p className="text-muted-foreground text-sm">{cert.issuer} • {cert.date}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div>
          <SectionHeading subtitle="Recognition and competition wins.">
            Achievements
          </SectionHeading>
          <div className="grid gap-6 mt-8">
            {profile.achievements.map((award, index) => (
              <Card key={index} delay={index * 0.1} className="flex flex-col gap-3 border-l-4 border-l-primary">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg leading-snug">{award.title}</h3>
                  <Trophy className="h-5 w-5 text-primary shrink-0 ml-2" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-primary font-medium text-sm">{award.event}</p>
                  <p className="text-muted-foreground text-xs">{award.date}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {award.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
