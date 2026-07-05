"use client";

import { profile } from "@/lib/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { m } from "framer-motion";

export function Skills() {
  const skillCategories = [
    { name: "Programming", skills: profile.skills.programming },
    { name: "Web Development", skills: profile.skills.web },
    { name: "Mobile Development", skills: profile.skills.mobile },
    { name: "Databases", skills: profile.skills.databases },
    { name: "Cloud & DevOps", skills: profile.skills.cloudDevOps },
    { name: "IoT & Embedded Systems", skills: profile.skills.iotEmbedded },
    { name: "Data Analysis", skills: profile.skills.dataAnalysis },
  ];

  return (
    <section id="skills" className="container px-4 py-24 md:px-6">
      <SectionHeading 
        subtitle="A comprehensive list of my technical capabilities." 
        align="center"
      >
        Skills & Tools
      </SectionHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, idx) => (
          <m.div
            key={category.name}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="flex flex-col gap-4 p-6 rounded-2xl border bg-card/50 backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold text-primary">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1 text-sm font-medium rounded-full border bg-background hover:border-primary hover:text-primary transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </m.div>
        ))}
      </div>
    </section>
  );
}
