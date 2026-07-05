import { Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/lib/profile";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/effects/reveal";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { ContactForm } from "@/components/sections/contact-form";

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading
        id="contact-heading"
        eyebrow="Contact"
        title="Get In Touch"
        subtitle="Let's connect and discuss potential collaborations."
      />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[5fr_6fr] lg:gap-14">
        <Reveal className="flex flex-col gap-8">
          <p className="text-base leading-relaxed text-muted-foreground">
            I&apos;m always open to discussing new projects, creative ideas or
            opportunities to be part of your visions.
          </p>

          <ul className="flex flex-col gap-5">
            <ContactDetail
              icon={<Mail className="h-5 w-5" aria-hidden="true" />}
              label="Email"
              value={profile.contact.email}
              href={`mailto:${profile.contact.email}`}
            />
            <ContactDetail
              icon={<Phone className="h-5 w-5" aria-hidden="true" />}
              label="Phone"
              value={profile.contact.phone}
              href={`tel:${profile.contact.phone.replace(/\s/g, "")}`}
            />
            <ContactDetail
              icon={<MapPin className="h-5 w-5" aria-hidden="true" />}
              label="Location"
              value={profile.contact.location}
            />
          </ul>

          <div className="flex gap-3">
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="flex flex-col gap-6 sm:p-8">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-xl font-semibold tracking-tight">
                Send a Message
              </h3>
              <p className="text-sm text-muted-foreground">
                I&apos;ll get back to you as soon as possible.
              </p>
            </div>
            <ContactForm />
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

function ContactDetail({
  icon,
  label,
  value,
  href,
}: Readonly<{
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}>) {
  const content = (
    <span className="group flex items-center gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          {label}
        </span>
        <span className="text-[15px] font-medium">{value}</span>
      </span>
    </span>
  );

  return (
    <li>{href ? <a href={href} className="block w-fit">{content}</a> : content}</li>
  );
}
