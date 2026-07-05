import { cn } from "@/lib/utils";
import { Reveal } from "@/components/effects/reveal";

interface SectionHeadingProps {
  /** Small mono label rendered above the title. */
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** Heading id — sections reference it via aria-labelledby. */
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-14 flex max-w-2xl flex-col gap-3",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2
        id={id}
        className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-muted-foreground text-pretty sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
