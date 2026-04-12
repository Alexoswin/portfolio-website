"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { profile } from "@/lib/profile";
import { Code2, Heart, Mail, ExternalLink } from "lucide-react";

const navLinks = [
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t bg-muted/30 pt-16 pb-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: About */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <m.div
                whileHover={{ rotate: 5 }}
                className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold"
              >
                {profile.name.charAt(0)}
              </m.div>
              <span className="text-xl font-bold tracking-tight">
                {profile.name}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-3">
              {profile.summary}
            </p>
            <div className="flex gap-3 mt-2">
              <SocialLink
                href={profile.contact.github}
                icon={<FaGithub className="h-5 w-5" />}
              />
              <SocialLink href="#" icon={<FaLinkedin className="h-5 w-5" />} />
              <SocialLink
                href={`mailto:${profile.contact.email}`}
                icon={<Mail className="h-5 w-5" />}
              />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold text-foreground">Navigation</h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-all flex items-center gap-2 group"
                >
                  <span className="h-1 w-1 rounded-full bg-primary/50 group-hover:h-3 group-hover:bg-primary transition-all" />
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Tech Focus */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold text-foreground">Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {profile.skills.web.slice(0, 7).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border bg-background/50 text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Column 4: Built With */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold text-foreground">
              Architecture
            </h4>
            <div className="grid gap-2">
              <TechItem name="Next.js 16" href="https://nextjs.org" />
              <TechItem name="Tailwind CSS 4" href="https://tailwindcss.com" />
              <TechItem name="Framer Motion" href="https://framer.com/motion" />
              <TechItem name="Lucide Icons" href="https://lucide.dev" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-muted-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-muted-foreground">
            © {currentYear} {profile.name}. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <m.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs text-muted-foreground flex items-center gap-1.5"
            >
              Made with{" "}
              <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> by{" "}
              {profile.name.split(" ")[0]}
            </m.p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon,
}: Readonly<{ href: string; icon: React.ReactNode }>) {
  return (
    <Link
      href={href}
      target="_blank"
      className="p-2.5 rounded-xl bg-background border hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all shadow-sm group"
    >
      <m.div
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </m.div>
    </Link>
  );
}

function TechItem({ name, href }: Readonly<{ name: string; href: string }>) {
  return (
    <Link
      href={href}
      target="_blank"
      className="group flex items-center justify-between text-xs text-muted-foreground hover:text-primary transition-all p-2 rounded-lg hover:bg-muted/50 border border-transparent hover:border-muted/50"
    >
      <span className="flex items-center gap-2">
        <Code2 className="h-3.5 w-3.5 opacity-70" />
        {name}
      </span>
      <ExternalLink className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </Link>
  );
}
