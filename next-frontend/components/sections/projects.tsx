"use client";

import { profile } from "@/lib/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { ExternalLink, Code2 } from "lucide-react";
import Link from "next/link";

export function Projects() {
  return (
    <section id="projects" className="container px-4 py-24 md:px-6">
      <SectionHeading 
        subtitle="Some of my recent work, ranging from AI platforms to full-stack systems." 
        align="center"
      >
        Featured Projects
      </SectionHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profile.projects.map((project, index) => (
          <Card key={project.title} delay={index * 0.1} className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Code2 className="h-6 w-6" />
              </div>
              <div className="flex gap-2">
                {project.link && (
                  <Link 
                    href={project.link} 
                    target="_blank"
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                )}
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t) => (
                <span 
                  key={t}
                  className="px-2 py-0.5 text-xs font-medium rounded-md bg-secondary/10 text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
            
            <ul className="grid gap-2 mb-6 flex-grow">
              {project.highlights.map((item) => (
                <li key={item} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {profile.openSource.length > 0 && (
        <div className="mt-16">
          <SectionHeading subtitle="Active contributor to the open source ecosystem.">
            Open Source
          </SectionHeading>
          <div className="grid gap-6 max-w-4xl mx-auto">
            {profile.openSource.map((os) => (
              <Card key={os.project} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-bold">{os.project} — {os.contribution}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{os.details}</p>
                </div>
                <Link 
                  href={os.link} 
                  target="_blank"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  View Pull Request <ExternalLink className="h-4 w-4" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
