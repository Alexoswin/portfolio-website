import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/effects/spotlight";

interface CardProps extends React.ComponentProps<"div"> {
  /** Pointer-tracked 3D tilt — use sparingly on showcase cards. */
  tilt?: boolean;
}

const cardStyles =
  "group card-glow relative overflow-hidden rounded-2xl border bg-card p-6 " +
  "shadow-card dark:shadow-card-dark transition-[border-color,box-shadow,transform] duration-300 " +
  "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5";

/**
 * Base surface of the design system. Server-rendered; the optional tilt
 * effect lives in an isolated client leaf so card content stays out of the
 * JS bundle.
 */
export function Card({ tilt = false, className, ...props }: CardProps) {
  if (tilt) {
    return <Spotlight tilt className={cn(cardStyles, className)} {...props} />;
  }
  return <div className={cn(cardStyles, className)} {...props} />;
}
