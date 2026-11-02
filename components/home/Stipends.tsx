import Link from "next/link";
import { SectionHead } from "@/components/home/SectionHead";
import { Accent } from "@/components/PageHeader";
import { IconExternalLink } from "@/components/conferences/icons";
import { STIPENDS } from "@/data/stipends";

export function Stipends() {
  return (
    <section className="bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          kicker="What a funded place pays you"
          title={
            <>
              Study on a stipend, <Accent>not on your family&apos;s savings.</Accent>
            </>
          }
          sub="Funded places cover your tuition and pay you every month to live and research. These are real awards, each with its official figure."
        />

        <ul className="mt-12 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {STIPENDS.map((s) => (
            <li key={s.award}>
              <a
                href={s.source}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col border border-line bg-white p-5 no-underline transition-colors duration-200 hover:border-ink"
              >
                <span className="flex items-center justify-between gap-3 font-body text-[13px] text-sub">
                  <span>
                    <span aria-hidden className="mr-1.5">
                      {s.flag}
                    </span>
                    {s.country} · {s.level}
                  </span>
                </span>
                <span className="mt-5 font-display text-[clamp(28px,2.6vw,36px)] leading-none tracking-[-0.02em] text-ink">
                  {s.amount}
                </span>
                <span className="mt-1.5 font-body text-[14px] text-sub">{s.per}</span>
                <span className="mt-5 border-t border-line pt-4 font-body text-[15px] font-medium text-ink">
                  {s.award}
                </span>
                <span className="mt-1 flex-1 font-body text-[13.5px] leading-relaxed text-sub">{s.note}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 font-body text-[13px] text-blue">
                  Official source
                  <IconExternalLink />
                </span>
              </a>
            </li>
          ))}

          <li className="flex flex-col justify-between bg-ink p-5 text-white">
            <p className="font-display text-[24px] leading-snug">Find the ones open to you.</p>
            <p className="mt-3 font-body text-[14px] leading-relaxed text-white/70">
              Amounts change each year and each award has its own rules. Check the source before you plan around a
              figure.
            </p>
            <Link
              href="/scholarships"
              className="mt-6 inline-flex items-center justify-between bg-white px-4 py-3 font-body text-[15px] font-medium text-ink no-underline hover:bg-soft"
            >
              Scholarship Calendar <span aria-hidden>→</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
