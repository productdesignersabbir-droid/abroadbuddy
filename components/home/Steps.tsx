import type { ReactNode } from "react";
import { Accent, Kicker } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";

// Each step keeps its feature's colour from the hero showcase.
const STEPS: {
  title: string;
  desc: string;
  tag: string;
  color: string;
  tint: string;
  icon: ReactNode;
}[] = [
  {
    title: "Check your readiness",
    desc: "Nine quick questions show where you stand and what to fix first.",
    tag: "5 min · Free",
    color: "#1F9D61",
    tint: "#E3F4EA",
    icon: (
      <>
        <path d="M4 17a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M11.2 17 12 9.5l.8 7.5z" fill="currentColor" className="ill-sway" />
        <circle cx="12" cy="17" r="1.8" fill="currentColor" />
      </>
    ),
  },
  {
    title: "Shortlist universities",
    desc: "Match by CGPA, major, country and budget.",
    tag: "Ranked by fit",
    color: "#1E4FFF",
    tint: "#EAF0FF",
    icon: (
      <>
        <g className="icon-bob">
          <path d="M3 9.5 12 5l9 4.5-9 4.5z" fill="currentColor" />
        </g>
        <path d="M7 12.5V16c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5v-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Find your professor",
    desc: "See ratings, lab culture and funding before you email.",
    tag: "Research fit",
    color: "#6C4CF1",
    tint: "#F0EBFF",
    icon: (
      <g className="icon-scan">
        <circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" strokeWidth="2" />
        <path d="m15 15 4.5 4.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    ),
  },
  {
    title: "Never miss a deadline",
    desc: "Track scholarships and conferences in one calendar.",
    tag: "Ongoing",
    color: "#C98A0B",
    tint: "#FFF3D6",
    icon: (
      <>
        <rect x="4" y="5.5" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="15" cy="14.8" r="2" fill="#FF3B47" className="ill-pulse" />
      </>
    ),
  },
];

function Arrow({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="absolute -right-4.5 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-white shadow-[0_6px_14px_-6px_rgba(11,18,32,0.45)] ring-4 ring-soft lg:grid"
      style={{ background: color }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="arrow-nudge">
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function Steps() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-soft py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-180 text-center">
          <Kicker>How it works</Kicker>
          <h2 className="mt-5 font-display text-[clamp(38px,5vw,66px)] leading-[1.04] tracking-[-0.035em] text-ink">
            Guidance that feels
            <br />
            <Accent>personal</Accent>, not generic.
          </h2>
        </div>

        <ol className="mt-14 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative flex flex-col rounded-[24px] bg-white p-6">
              <div className="flex items-center justify-between">
                <span
                  className="grid h-12 w-12 place-items-center rounded-[14px]"
                  style={{ background: s.tint, color: s.color }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="overflow-visible">
                    {s.icon}
                  </svg>
                </span>
                <span className="font-display text-[18px] italic" style={{ color: s.color }}>
                  Step · 0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-body text-[19px] font-medium leading-snug text-ink">{s.title}</h3>
              <p className="mt-2 font-body text-[14.5px] leading-relaxed text-sub">{s.desc}</p>
              <span
                className="mt-6 self-start rounded-[8px] px-2.5 py-1 font-body text-[12.5px]"
                style={{ background: s.tint, color: s.color }}
              >
                {s.tag}
              </span>
              {i < STEPS.length - 1 && <Arrow color={STEPS[i + 1].color} />}
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-5">
          <p className="font-body text-[15.5px] text-sub">Start your journey today.</p>
          <Button href="/readiness" variant="primary" className="px-6.5 py-3.5 text-[16px]">
            Check my readiness →
          </Button>
        </div>
      </div>
    </section>
  );
}
