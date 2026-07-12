import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 no-underline">
      <div className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-linear-to-br from-blue to-[#4B78FF] shadow-[0_6px_16px_rgba(30,79,255,0.30)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 11.5L21 3l-6.5 18-3.2-7.3L3 11.5z" fill="#fff" />
          <circle cx="18.5" cy="6" r="2" fill="#FF3B47" />
        </svg>
      </div>
      <span className="font-display text-xl font-bold tracking-[-0.02em] text-ink">
        Easi<span className="text-blue">Abroad</span>
      </span>
    </Link>
  );
}
