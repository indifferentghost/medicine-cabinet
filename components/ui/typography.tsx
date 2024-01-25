import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

export const TextH1 = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h1
    className={cn(
      "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
  </h1>
));

TextH1.displayName = "TextH1";

export const TextMuted = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    ref={ref}
    {...props}
  >
    {children}
  </p>
));

TextMuted.displayName = "TextMuted";

export function TypographyMuted() {}
