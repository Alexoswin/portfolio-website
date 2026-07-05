import { ArrowUpRight, Code2, GitPullRequest, Sparkles } from "lucide-react";
import { profile, type ProjectEntry } from "@/lib/profile";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/effects/reveal";
import { cn } from "@/lib/utils";

export function Projects() {
  const [featured, ...rest] = profile.projects;

  return (
    <Section id="projects">
      <SectionHeading
        id="projects-heading"
        eyebrow="Portfolio"
        title="Featured Projects"
        subtitle="Some of my recent work, ranging from AI platforms to full-stack systems."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Reveal className="md:col-span-2">
          <ProjectCard project={featured} featured />
        </Reveal>
        {rest.map((project, index) => (
          <Reveal key={project.title} delay={(index % 2) * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {profile.openSource.length > 0 && (
        <div className="mt-20">
          <SectionHeading
            id="open-source-heading"
            eyebrow="Community"
            title="Open Source"
            subtitle="Contributions to the open source ecosystem."
          />
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            {profile.openSource.map((os) => (
              <Reveal key={os.project}>
                <Card tilt className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <GitPullRequest className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-semibold tracking-tight">
                        {os.project}{" "}
                        <span className="text-muted-foreground">—</span>{" "}
                        {os.contribution}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {os.details}
                      </p>
                    </div>
                  </div>
                  <a
                    href={os.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    View Pull Request
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}

function ProjectCard({
  project,
  featured = false,
}: Readonly<{ project: ProjectEntry; featured?: boolean }>) {
  return (
    <Card
      tilt
      className={cn(
        "flex h-full flex-col gap-4",
        featured && "md:p-8 lg:flex-row lg:items-start lg:gap-10",
      )}
    >
      <div className={cn("flex flex-col gap-4", featured && "lg:flex-1")}>
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {featured ? (
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Code2 className="h-5 w-5" aria-hidden="true" />
            )}
          </span>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} (live site)`}
              className="flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Live
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>

        <h3
          className={cn(
            "font-semibold tracking-tight transition-colors group-hover:text-primary",
            featured ? "text-2xl" : "text-xl",
          )}
        >
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <ul className={cn("flex flex-col gap-2.5", featured && "lg:flex-1 lg:pt-2")}>
        {project.highlights.map((item) => (
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
  );
}
