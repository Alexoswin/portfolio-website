import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const baseStyles =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-background shadow-sm hover:bg-foreground/85 hover:shadow-glow/40",
  outline:
    "border border-border bg-card/60 text-foreground backdrop-blur-sm hover:border-primary/50 hover:bg-accent hover:text-accent-foreground",
  ghost: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleProps = {}) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

type ButtonProps = ButtonStyleProps & React.ComponentProps<"button">;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button className={buttonStyles({ variant, size, className })} {...props} />
  );
}

type ButtonLinkProps = ButtonStyleProps & React.ComponentProps<typeof Link>;

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props} />
  );
}
