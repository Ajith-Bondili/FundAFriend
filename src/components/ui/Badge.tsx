import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

const variants: Record<string, string> = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border border-input",
};

const Badge = ({ className, variant = "default", ...props }: BadgeProps) => (
  <div className={cn("inline-flex items-center px-2 py-1 text-xs font-medium rounded-md", variants[variant], className)} {...props} />
);

export { Badge };
