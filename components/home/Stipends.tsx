import { SectionHead } from "@/components/home/SectionHead";
import { Accent } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { IconExternalLink } from "@/components/conferences/icons";
import { FX_DATE, FX_SOURCE, STIPENDS, formatTaka, takaPerMonth } from "@/data/stipends";

// Highest monthly figure first, so the bars step down and the taka reads as
// the headline: that is what a student back home compares against.
const ROWS = STIPENDS.map((s) => ({ ...s, taka: takaPerMonth(s) })).sort((a, b) => b.taka - a.taka);
const TOP = ROWS[0].taka;

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
          sub="A funded master's or PhD covers your tuition and pays you every month to live and research. Here is what real awards pay, in taka."
        />

        <ul className="mt-12 grid list-none grid-cols-2 gap-3 p-0 lg:grid-cols-3">
          {ROWS.map((s) => (
            <li key={s.award}>
              <a
                href={s.source}
                target="_blank"
                rel="noopener noreferrer"
                title={`${s.note} Source: ${s.award}`}
                className="group flex h-full flex-col border border-line bg-white p-4 no-underline transition-colors duration-200 hover:border-ink sm:p-6"
              >
                <span className="font-body text-[12px] uppercase tracking-[0.12em] text-sub sm:text-[13px]">
                  <span aria-hidden className="mr-1.5">
                    {s.flag}
                  </span>
                  {s.country} · {s.level}
                </span>

                <span className="mt-4 flex flex-wrap items-baseline gap-x-2 sm:mt-5">
                  <span className="font-display text-[clamp(26px,3.4vw,44px)] leading-none tracking-[-0.02em] text-ink">
                    {formatTaka(s.taka)}
                  </span>
                  <span className="font-body text-[13px] text-sub sm:text-[14px]">a month</span>
                </span>

                <span aria-hidden className="mt-4 block h-1 bg-softer">
                  <span className="block h-full bg-blue" style={{ width: `${(s.taka / TOP) * 100}%` }} />
                </span>

                <span className="mt-4 font-body text-[14px] font-medium text-ink sm:text-[15px]">
                  {s.amount} {s.per}
                </span>
                <span className="mt-0.5 font-body text-[13px] text-sub sm:text-[14px]">{s.award}</span>
                <span className="mt-2 hidden flex-1 font-body text-[13.5px] leading-relaxed text-sub sm:block">
                  {s.note}
                </span>

                <span className="mt-4 inline-flex items-center gap-1.5 font-body text-[13px] text-blue">
                  Official source
                  <IconExternalLink />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl font-body text-[14px] leading-relaxed text-sub">
            Taka at the{" "}
            <a href={FX_SOURCE} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">
              Bangladesh Bank rate of {FX_DATE}
            </a>
            . Amounts change each year and each award has its own rules, so check the source before you plan around a
            figure.
          </p>
          <Button href="/scholarships" variant="primary" className="shrink-0 justify-center px-6 py-3.5 text-[16px]">
            Find the ones open to you
          </Button>
        </div>
      </div>
    </section>
  );
}
