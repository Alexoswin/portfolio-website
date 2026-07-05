"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

const inputStyles =
  "w-full rounded-xl border border-input bg-background/70 px-3.5 py-2.5 text-sm " +
  "placeholder:text-muted-foreground/60 transition-[border-color,box-shadow] duration-200 " +
  "hover:border-primary/40 focus:border-primary focus:shadow-[0_0_0_3px] focus:shadow-primary/15 focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots that fill the hidden field get a silent no-op success.
    if (data.get("company")) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("loading");
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(siteConfig.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate={false}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name">
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            maxLength={120}
            placeholder="John Doe"
            className={inputStyles}
          />
        </Field>
        <Field label="Email" htmlFor="contact-email">
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={254}
            placeholder="john@example.com"
            className={inputStyles}
          />
        </Field>
      </div>

      <Field label="Subject" htmlFor="contact-subject">
        <input
          id="contact-subject"
          name="subject"
          required
          maxLength={200}
          placeholder="How can I help you?"
          className={inputStyles}
        />
      </Field>

      <Field label="Message" htmlFor="contact-message">
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={4000}
          rows={5}
          placeholder="Your message here..."
          className={cn(inputStyles, "min-h-30 resize-y")}
        />
      </Field>

      {/* Honeypot — visually hidden and skipped by screen readers / tab order. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company">
          Company
          <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div aria-live="polite" className="min-h-5 text-sm">
        {status === "success" && (
          <p className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Message sent successfully — I&apos;ll get back to you soon!
          </p>
        )}
        {status === "error" && (
          <p className="flex items-center gap-2 text-danger">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            Failed to send message. Please try again or email me directly.
          </p>
        )}
      </div>

      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <Send
              className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              aria-hidden="true"
            />
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: Readonly<{ label: string; htmlFor: string; children: React.ReactNode }>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
