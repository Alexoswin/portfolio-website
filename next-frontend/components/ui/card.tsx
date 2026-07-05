import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/effects/spotlight";

interface CardProps extends React.ComponentProps<"div"> {
  /** Disable the cursor-following highlight for purely static cards. */
  spotlight?: boolean;
}

const cardStyles =
  "group relative overflow-hidden rounded-2xl border bg-card p-6 " +
  "shadow-card dark:shadow-card-dark transition-[border-color,box-shadow,transform] duration-300 " +
  "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5";

/**
 * Base surface of the design system. Server-rendered; the optional spotlight
 * effect is an isolated client leaf so card content stays out of the JS bundle.
 */
export function Card({ spotlight = true, className, ...props }: CardProps) {
  if (spotlight) {
    return <Spotlight className={cn(cardStyles, className)} {...props} />;
  }
  return <div className={cn(cardStyles, className)} {...props} />;
}
