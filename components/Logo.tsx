import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 no-underline">
      <span
        className={`grid h-8 w-8 place-items-center rounded-full border-[1.5px] ${
          light ? "border-white text-white" : "border-ink text-ink"
        }`}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 11.5L21 3l-6.5 18-3.2-7.3L3 11.5z" fill="currentColor" />
          <circle cx="18.5" cy="6" r="2.4" fill="#FF3B47" />
        </svg>
      </span>
      <span
        className={`font-display text-[23px] tracking-[-0.02em] ${light ? "text-white" : "text-ink"}`}
      >
        Easi<span className={`italic ${light ? "text-[#8FA8FF]" : "text-blue"}`}>Abroad</span>
      </span>
    </Link>
  );
}
