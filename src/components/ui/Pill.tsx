import React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "ink" | "paper" | "ghost" | "ghost-light";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

type PillProps = BaseProps &
  (
    | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">)
    | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">)
  );

/** Pill button: a circle of the inverse tone rises on hover while the label rolls. */
export function Pill({ variant = "ink", size = "md", className, children, icon, ...rest }: PillProps) {
  const classes = cn(
    "pill",
    `pill-${variant}`,
    size === "sm" && "pill-sm",
    size === "lg" && "pill-lg",
    className,
  );
  const inner = (
    <>
      <span className="roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchor } = rest;
    const external = /^https?:/.test(href);
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...anchor}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchor}>
        {inner}
      </Link>
    );
  }
  const { type = "button", ...button } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...button}>
      {inner}
    </button>
  );
}
