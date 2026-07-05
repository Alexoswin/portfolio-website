import Link from "next/link";
import { ArrowUpRight, Heart, Mail } from "lucide-react";
import { profile } from "@/lib/profile";
import { siteConfig } from "@/lib/site";
import { getCurrentYear } from "@/lib/time";
import { Container } from "@/components/ui/container";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

const stack = [
  { name: "Next.js 16", href: "https://nextjs.org" },
  { name: "Tailwind CSS 4", href: "https://tailwindcss.com" },
  { name: "TypeScript", href: "https://www.typescriptlang.org" },
  { name: "Vercel", href: "https://vercel.com" },
];

export async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="relative border-t bg-card/40">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 mx-auto h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />

      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-(--glow-1) to-(--glow-2) font-mono text-sm font-bold text-white">
                {profile.name.charAt(0)}
              </span>
              <span className="text-[15px] font-semibold tracking-tight">
                {profile.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {profile.title} building AI-powered platforms and scalable backend
              systems in {profile.contact.location}.
            </p>
            <div className="flex gap-2">
              <SocialLink
                href={profile.contact.github}
                label="GitHub"
                icon={<GitHubIcon className="h-4.5 w-4.5" />}
              />
              <SocialLink
                href={profile.contact.linkedin}
                label="LinkedIn"
                icon={<LinkedInIcon className="h-4.5 w-4.5" />}
              />
              <SocialLink
                href={`mailto:${profile.contact.email}`}
                label="Email"
                icon={<Mail className="h-4.5 w-4.5" aria-hidden="true" />}
              />
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold">Navigate</h2>
            {siteConfig.nav.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold">Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills["Web Development"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold">Built with</h2>
            {stack.map((tech) => (
              <a
                key={tech.name}
                href={tech.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {tech.name}
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-0 transition-[opacity,translate] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Made with
            <Heart
              className="h-3.5 w-3.5 fill-danger text-danger"
              aria-hidden="true"
            />
            <span className="sr-only">love</span>
            in {profile.contact.location.split(",")[0]}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: Readonly<{ href: string; label: string; icon: React.ReactNode }>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
    >
      {icon}
    </a>
  );
}
