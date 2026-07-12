import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "white" | "outline-light";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-blue text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(30,79,255,0.34)]",
  ghost:
    "bg-white text-ink border-[1.5px] border-line hover:border-blue/50",
  white:
    "bg-white text-blue shadow-[0_10px_24px_rgba(0,0,0,0.16)] hover:-translate-y-0.5",
  "outline-light":
    "bg-white/10 text-white border-[1.5px] border-white/40 hover:bg-white/20",
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
  const classes = `inline-flex items-center justify-center gap-2 rounded-button font-body text-[15px] font-semibold px-[18px] py-[10px] transition-all duration-150 ${VARIANT_CLASSES[variant]} ${className}`;

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
