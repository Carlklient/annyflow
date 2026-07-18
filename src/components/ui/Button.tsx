"use client";

import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-soft hover:bg-primary-dark hover:shadow-lift hover:-translate-y-0.5",
  secondary:
    "bg-white text-dark border border-border shadow-soft hover:border-primary/30 hover:shadow-lift hover:-translate-y-0.5",
  ghost: "bg-transparent text-text hover:bg-dark/5",
  dark: "bg-dark text-white shadow-soft hover:bg-dark/90 hover:shadow-lift hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-11 px-6 py-3 text-sm",
  lg: "min-h-12 px-8 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-ring disabled:opacity-50 disabled:pointer-events-none";

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("sms:")
  );
}

export function Button(props: ButtonProps) {
  const classes = cn(
    base,
    variants[props.variant ?? "primary"],
    sizes[props.size ?? "md"],
    props.className
  );

  if ("href" in props && props.href) {
    const { href, external, children } = props;
    const openExternal = external ?? isExternalHref(href);

    if (openExternal) {
      const newTab = href.startsWith("http://") || href.startsWith("https://");
      return (
        <a
          href={href}
          className={classes}
          {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, className, variant, size, type = "button", ...rest } =
    buttonProps;

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
