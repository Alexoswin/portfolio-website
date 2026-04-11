"use client";

import { profile } from "@/lib/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Briefcase, MapPin, Calendar } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="container px-4 py-24 md:px-6">
      <SectionHeading
        subtitle="My professional journey and industry experience."
        align="center"
      >
        Work Experience
      </SectionHeading>

      <div className="mx-auto max-w-4xl flex flex-col gap-8">
        {profile.experience.map((exp) => (
          <Card key={`${exp.company}-${exp.role}`} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
              <div>
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Briefcase className="h-4 w-4" />
                  {exp.company}
                </div>
              </div>
              <div className="flex flex-col md:items-end text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {exp.period}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {exp.location}
                </div>
              </div>
            </div>

            <ul className="grid gap-2 list-none">
              {exp.achievements.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
