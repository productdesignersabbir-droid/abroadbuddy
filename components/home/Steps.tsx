import Link from "next/link";
import { Accent, Kicker } from "@/components/PageHeader";

const STEPS = [
  {
    title: "Check your readiness",
    desc: "Five questions show where you stand and what to fix first.",
    tag: "5 min · Free",
  },
  {
    title: "Shortlist universities",
    desc: "Match by CGPA, major, country and budget.",
    tag: "Ranked by fit",
  },
  {
    title: "Find your professor",
    desc: "See ratings, lab culture and funding before you email.",
    tag: "Research fit",
  },
  {
    title: "Never miss a deadline",
    desc: "Track scholarships and conferences in one calendar.",
    tag: "Ongoing",
  },
];

function Arrow() {
  return (
    <span
      aria-hidden
      className="absolute -right-4.5 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-ink text-white lg:grid"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
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
              <span className={`font-display text-[18px] italic ${i % 2 ? "text-blue" : "text-red"}`}>
                Step · 0{i + 1}
              </span>
              <h3 className="mt-5 font-body text-[19px] font-medium leading-snug text-ink">{s.title}</h3>
              <p className="mt-2 font-body text-[14.5px] leading-relaxed text-sub">{s.desc}</p>
              <span className="mt-6 self-start rounded-[8px] bg-soft px-2.5 py-1 font-body text-[12.5px] text-ink">
                {s.tag}
              </span>
              {i < STEPS.length - 1 && <Arrow />}
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-10 w-fit rounded-pill bg-white px-5 py-2.5 text-center font-body text-[14.5px] text-sub">
          Start your journey today.{" "}
          <Link href="/readiness" className="font-medium text-ink underline underline-offset-4">
            Check my readiness
          </Link>
        </p>
      </div>
    </section>
  );
}
