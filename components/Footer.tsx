import Link from "next/link";
import type { ReactNode } from "react";
import { ROUTES } from "@/lib/routes";
import { Logo } from "@/components/Logo";

const COMPANY_LINKS = ["About", "Contact", "Privacy", "Terms"];

// Profiles aren't live yet, so these are placeholders with no link.
const SOCIALS: { name: string; icon: ReactNode }[] = [
  {
    name: "Facebook",
    icon: (
      <path
        d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z"
        fill="currentColor"
      />
    ),
  },
  {
    name: "Instagram",
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
      </>
    ),
  },
  {
    name: "LinkedIn",
    icon: (
      <path
        d="M4.5 9h3.2v10.5H4.5zM6.1 4a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8zM9.8 9h3.1v1.4c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5v5.8h-3.2v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7v5.2H9.8z"
        fill="currentColor"
      />
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink px-6 pb-6 pt-20 text-white">
      {/* Soft blue glow along the top and in the corners. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(60% 55% at 50% -12%, rgba(30,79,255,0.38), transparent 70%)",
            "radial-gradient(40% 60% at 100% 0%, rgba(30,79,255,0.32), transparent 70%)",
            "radial-gradient(35% 50% at 0% 100%, rgba(11,47,232,0.26), transparent 70%)",
          ].join(","),
        }}
      />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#5C7BFF]/60 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-80 font-body text-[15px] leading-relaxed text-white/65">
            The one-stop platform helping Bangladeshi students plan their study abroad —
            from readiness to their first offer.
          </p>
          <ul className="mt-6 flex list-none gap-2.5 p-0" aria-label="Social media">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <span
                  title={`${s.name} — coming soon`}
                  aria-label={`${s.name} (coming soon)`}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/8 text-white/80 ring-1 ring-white/12 transition-colors hover:bg-blue hover:text-white hover:ring-blue"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    {s.icon}
                  </svg>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-[26px] tracking-[-0.02em] text-white">Features</h2>
          <ul className="mt-4 grid list-none gap-2.5 p-0">
            {ROUTES.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="font-body text-[15px] text-white/65 no-underline transition-colors hover:text-white"
                >
                  {r.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-[26px] tracking-[-0.02em] text-white">Company</h2>
          <ul className="mt-4 grid list-none gap-2.5 p-0">
            {COMPANY_LINKS.map((label) => (
              <li key={label}>
                <span className="cursor-default font-body text-[15px] text-white/65">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-14 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
        <span className="font-body text-[13.5px] text-white/55">
          © 2026 EasiAbroad. Made in Bangladesh 🇧🇩
        </span>
        <span className="font-body text-[13px] text-white/55">MVP · v0.1</span>
      </div>
    </footer>
  );
}
