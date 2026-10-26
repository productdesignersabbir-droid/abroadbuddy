import type { ReactNode } from "react";

/** A pick-one (or pick-many) option button, shared by the simple tool pages. */
export function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`border px-3.5 py-2 text-left font-body text-[14px] font-medium transition-colors ${
        selected
          ? "border-blue bg-blue text-white"
          : "border-line bg-white text-ink hover:border-ink/30"
      }`}
    >
      {children}
    </button>
  );
}

/** A numbered question block: label, optional hint, then its options. */
export function Field({
  step,
  label,
  hint,
  children,
}: {
  step?: number;
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="font-body text-[15px] font-semibold text-ink">
        {step !== undefined && <span className="mr-2 font-label text-[12px] text-blue">{String(step).padStart(2, "0")}</span>}
        {label}
      </p>
      {hint && <p className="mt-1 font-body text-[13px] text-sub">{hint}</p>}
      <div className="mt-3">{children}</div>
    </div>
  );
}

export const inputClass =
  "w-full border-[1.5px] border-line bg-white px-3.5 py-2.5 font-body text-[15px] text-ink outline-none placeholder:text-sub/70 focus-visible:border-blue";
