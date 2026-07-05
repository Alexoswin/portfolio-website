import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface SectionProps extends React.ComponentProps<"section"> {
  id: string;
}

/**
 * Landmark wrapper for home-page sections. Pairs with a <SectionHeading
 * id={`${id}-heading`}> so the region is labelled for assistive tech.
 */
export function Section({ id, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("relative scroll-mt-20 py-20 sm:py-28", className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}
