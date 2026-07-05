import { cn } from "@/lib/utils";

/** Centered content column used by every section — one source of truth for page gutters. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}
      {...props}
    />
  );
}
