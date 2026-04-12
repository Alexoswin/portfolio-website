"use client";

import { m } from "framer-motion";
import { profile } from "@/lib/profile";
import { Mail, Phone, MapPin, ArrowRight, FileText } from "lucide-react";

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center pt-20 overflow-hidden">
      <div className="container px-4 md:px-6 z-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border bg-muted px-3 py-1 text-sm font-medium"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />{" "}
            Available for new opportunities
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Hi, I'm <span className="text-gradient">{profile.name}</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[700px] text-muted-foreground text-lg md:text-xl"
          >
            {profile.summary}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 py-8"
          >
            <Link
              href="#projects"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href={profile.contact.resume}
              target="_blank"
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <FileText className="mr-2 h-4 w-4" />
              Resume
            </Link>
            <Link
              href={profile.contact.github}
              target="_blank"
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground"
            >
              <FaGithub className="mr-2 h-4 w-4" />
              GitHub
            </Link>
            <Link
              href={profile.contact.linkedin}
              target="_blank"
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground"
            >
              <FaLinkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Link>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-8 "
          >
            <ContactItem
              icon={<Mail className="h-4 w-4" />}
              text={profile.contact.email}
            />
            <ContactItem
              icon={<Phone className="h-4 w-4" />}
              text={profile.contact.phone}
            />
            <ContactItem
              icon={<FaGithub className="h-4 w-4" />}
              text="Alexoswin"
            />
            <ContactItem
              icon={<FaLinkedin className="h-4 w-4" />}
              text="oswin-alex"
            />
            <ContactItem
              icon={<MapPin className="h-4 w-4" />}
              text={profile.contact.location}
            />
          </m.div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  text,
}: Readonly<{ icon: React.ReactNode; text: string }>) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
      <div className="p-2 rounded-lg bg-muted text-primary">{icon}</div>
      <span>{text}</span>
    </div>
  );
}
