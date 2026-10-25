import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "dark" | "white" | "outline-light";

// Flat pill buttons, after the Visaro reference.
const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-blue text-white hover:bg-blue-deep",
  ghost: "bg-softer text-ink hover:bg-[#E2DCD2]",
  dark: "bg-ink text-white hover:bg-[#1c2536]",
  white: "bg-white text-ink hover:bg-soft",
  "outline-light": "bg-white/10 text-white border border-white/30 hover:bg-white/20",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-button font-body text-[15px] font-medium px-5 py-2.5 transition-colors duration-150 ${VARIANT_CLASSES[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
