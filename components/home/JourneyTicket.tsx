import { Button } from "@/components/ui/Button";
import { Accent, Kicker } from "@/components/PageHeader";

const STATS = [
  { value: "5", label: "Free tools" },
  { value: "100%", label: "Official source links" },
  { value: "1", label: "Plan made for you" },
];

const STUB_POINTS = [
  "Five quick questions",
  "Readiness score out of 100",
  "A personal to-do list",
  "Links to the right tools",
];

const PILLARS = [
  {
    title: "Made for Bangladesh",
    desc: "Built around our CGPA scale, common tests and the countries our students choose.",
  },
  {
    title: "Official links only",
    desc: "Every scholarship and conference links to its official website.",
  },
  {
    title: "Free while in beta",
    desc: "All five tools are free. No sign-up needed to start.",
  },
];

function PlaneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 11.5L21 3l-6.5 18-3.2-7.3L3 11.5z" fill="currentColor" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function JourneyTicket() {
  return (
    <section className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-180 text-center">
          <Kicker>About EasiAbroad</Kicker>
          <h2 className="mt-5 font-display text-[clamp(38px,5vw,66px)] leading-[1.04] tracking-[-0.035em] text-ink">
            Built on <Accent>evidence</Accent>,
            <br />
            not promises.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_340px]">
          <div className="overflow-hidden rounded-t-[30px] bg-white lg:rounded-l-[30px] lg:rounded-tr-none">
            <div className="flex items-center justify-between bg-soft px-7 py-4 font-body text-[14px] text-sub">
              <span className="font-display text-[20px] text-ink">EasiAbroad</span>
              <span>Boarding pass · Est. 2026</span>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-7 py-10">
              <div>
                <div className="font-display text-[clamp(40px,5vw,60px)] leading-none tracking-[-0.03em] text-ink">
                  HERE
                </div>
                <p className="mt-2 font-body text-[14px] text-sub">Where you are now</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="hidden h-px w-16 border-t-2 border-dashed border-line sm:block" />
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-blue text-white">
                    <PlaneIcon />
                  </span>
                  <span className="hidden h-px w-16 border-t-2 border-dashed border-line sm:block" />
                </div>
                <span className="font-body text-[13px] text-sub">Clear next steps</span>
              </div>
              <div className="text-right">
                <div className="font-display text-[clamp(40px,5vw,60px)] leading-none tracking-[-0.03em] text-ink">
                  THERE
                </div>
                <p className="mt-2 font-body text-[14px] text-sub">Where you want to be</p>
              </div>
            </div>

            <dl className="grid grid-cols-3 border-t border-line">
              {STATS.map((s, i) => (
                <div key={s.label} className={`px-7 py-6 ${i > 0 ? "border-l border-line" : ""}`}>
                  <dt className="font-body text-[13px] text-sub">{s.label}</dt>
                  <dd className="mt-2 font-display text-[34px] leading-none tracking-[-0.02em] text-ink">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The tear-off stub. */}
          <div className="relative rounded-b-[30px] bg-ink px-7 py-8 text-white lg:rounded-r-[30px] lg:rounded-bl-none">
            <div
              aria-hidden
              className="absolute -top-px left-6 right-6 border-t-2 border-dashed border-white/30 lg:bottom-6 lg:left-0 lg:right-auto lg:top-6 lg:border-l-2 lg:border-t-0"
            />
            <h3 className="font-display text-[28px] leading-tight tracking-[-0.02em]">
              Start your readiness check
            </h3>
            <ul className="mt-6 grid list-none gap-3 p-0">
              {STUB_POINTS.map((p) => (
                <li key={p} className="flex items-center gap-2.5 font-body text-[15px] text-white/85">
                  <Check /> {p}
                </li>
              ))}
            </ul>
            <Button href="/readiness" variant="primary" className="mt-8 w-full py-3.5">
              Check my readiness
            </Button>
            <p className="mt-3 text-center font-body text-[12.5px] text-white/55">
              Takes about five minutes
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div key={p.title} className={i > 0 ? "sm:border-l sm:border-line sm:pl-8" : ""}>
              <h3 className="font-body text-[17px] font-medium text-ink">{p.title}</h3>
              <p className="mt-1.5 font-body text-[15px] leading-relaxed text-sub">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
