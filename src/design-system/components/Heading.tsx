import React from "react";
import { cn } from "../../lib/utils";

export type HeadingLevel = "display" | "h1" | "h2" | "h3" | "h4";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  children: React.ReactNode;
  className?: string;
}

const levelClasses: Record<HeadingLevel, string> = {
  display: "text-display font-bold leading-display tracking-heading",
  h1: "text-h1 font-bold leading-h1 tracking-heading",
  h2: "text-h2 font-bold leading-h2 tracking-heading",
  h3: "text-h3 font-bold leading-h3",
  h4: "text-h4 font-bold leading-h4",
};

/**
 * Standard Design System Heading Component
 * Supports Display, H1, H2, H3, H4 levels adhering strictly to the Play font typography system.
 */
export const Heading: React.FC<HeadingProps> = ({
  level = "h2",
  as,
  children,
  className,
  ...props
}) => {
  const Component = as || (level === "display" ? "h1" : level);
  return (
    <Component
      className={cn(
        "font-play text-slate-900 dark:text-white transition-colors",
        levelClasses[level],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Heading.displayName = "Heading";
export default Heading;
