import { ArrowRight, ChevronDown, FileText, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/lib/profile";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { ParticleField } from "@/components/effects/particle-field";

/** Staggered entrance — pure CSS keyframes, so nothing waits for hydration. */
function entrance(step: number): React.CSSProperties {
  return { animationDelay: `${step * 0.12}s` };
}

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden pt-16"
    >
      <ParticleField className="absolute inset-0 h-full w-full" quantity={90} />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/60 to-transparent"
      />

      <Container className="relative z-10 flex flex-col items-center gap-6 py-20 text-center">
        <p
          className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 py-1.5 pr-4 pl-3 text-sm font-medium text-muted-foreground backdrop-blur-sm"
          style={entrance(0)}
        >
          <span
            className="animate-pulse-dot h-2 w-2 rounded-full bg-success"
            aria-hidden="true"
          />
          Available for new opportunities
        </p>

        <div className="animate-fade-up flex flex-col gap-4" style={entrance(1)}>
          <p className="eyebrow">
            {profile.title} · {profile.contact.location}
          </p>
          <h1 className="text-5xl font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl lg:text-8xl">
            Hi, I&apos;m{" "}
            <span className="text-gradient-animated">{profile.name}</span>
          </h1>
        </div>

        <p
          className="animate-fade-up max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg md:text-xl"
          style={entrance(2)}
        >
          {profile.summary}
        </p>

        <div
          className="animate-fade-up mt-4 flex flex-wrap items-center justify-center gap-3"
          style={entrance(3)}
        >
          <ButtonLink href="/#projects" size="lg">
            View Projects
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
              aria-hidden="true"
            />
          </ButtonLink>
          <ButtonLink
            href={profile.contact.resume}
            variant="outline"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            Resume
          </ButtonLink>
          <div className="flex gap-2">
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <ul
          className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-xs text-muted-foreground sm:text-sm"
          style={entrance(4)}
        >
          <li>
            <a
              href={`mailto:${profile.contact.email}`}
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Mail className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {profile.contact.email}
            </a>
          </li>
          <li>
            <a
              href={`tel:${profile.contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Phone className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {profile.contact.phone}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {profile.contact.location}
          </li>
        </ul>
      </Container>

      <a
        href="/#experience"
        aria-label="Scroll to experience"
        className="animate-fade-in absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-primary"
        style={{ animationDelay: "1.2s" }}
      >
        <ChevronDown className="animate-float h-5 w-5" aria-hidden="true" />
      </a>
    </section>
  );
}
