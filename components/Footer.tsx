import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { Logo } from "@/components/Logo";

const COMPANY_LINKS = ["About", "Contact", "Privacy", "Terms"];

export function Footer() {
  return (
    <footer className="bg-paper px-6 pb-6 pt-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-80 font-body text-[15px] leading-relaxed text-sub">
            The one-stop platform helping Bangladeshi students plan their study abroad —
            from readiness to their first offer.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[26px] tracking-[-0.02em] text-ink">Features</h2>
          <ul className="mt-4 grid list-none gap-2.5 p-0">
            {ROUTES.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="font-body text-[15px] text-sub no-underline hover:text-ink"
                >
                  {r.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-[26px] tracking-[-0.02em] text-ink">Company</h2>
          <ul className="mt-4 grid list-none gap-2.5 p-0">
            {COMPANY_LINKS.map((label) => (
              <li key={label}>
                <span className="cursor-default font-body text-[15px] text-sub">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-wrap items-center justify-between gap-3 rounded-[16px] bg-soft px-5 py-4">
        <span className="font-body text-[13.5px] text-sub">
          © 2026 EasiAbroad. Made in Bangladesh 🇧🇩
        </span>
        <span className="font-body text-[13px] text-sub">MVP · v0.1</span>
      </div>
    </footer>
  );
}
