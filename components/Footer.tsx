import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const COMPANY_LINKS = ["About", "Careers", "Blog", "Contact", "Privacy"];

export function Footer() {
  const half = Math.ceil(ROUTES.length / 2);
  const exploreCols = [ROUTES.slice(0, half), ROUTES.slice(half)];

  return (
    <footer className="bg-ink px-6 pb-8.5 pt-15 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-[9px] bg-linear-to-br from-blue to-[#4B78FF]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 11.5L21 3l-6.5 18-3.2-7.3L3 11.5z" fill="#fff" />
              </svg>
            </div>
            <span className="font-display text-[19px] font-bold">
              Easi<span className="text-[#7D9BFF]">Abroad</span>
            </span>
          </div>
          <p className="mt-3.5 max-w-70 font-body text-sm leading-relaxed text-white/60">
            The one-stop platform helping Bangladeshi students study abroad — smarter,
            together.
          </p>
        </div>

        {exploreCols.map((col, i) => (
          <div key={i}>
            <div className="font-label text-[11.5px] uppercase tracking-[0.1em] text-white/50">
              {i === 0 ? "Explore" : "Resources"}
            </div>
            <ul className="mt-3.5 grid gap-2.5 list-none p-0">
              {col.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="font-body text-sm text-white/78 no-underline hover:text-white"
                  >
                    {r.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <div className="font-label text-[11.5px] uppercase tracking-[0.1em] text-white/50">
            Company
          </div>
          <ul className="mt-3.5 grid gap-2.5 list-none p-0">
            {COMPANY_LINKS.map((label) => (
              <li key={label}>
                <span className="cursor-default font-body text-sm text-white/78">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8.5 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5.5">
        <span className="font-body text-[13px] text-white/50">
          © 2026 EasiAbroad. Made in Bangladesh 🇧🇩
        </span>
        <span className="font-label text-xs tracking-[0.05em] text-white/40">
          MVP · v0.1
        </span>
      </div>
    </footer>
  );
}
