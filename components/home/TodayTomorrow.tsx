"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Accent } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";

// Easi today, abroad tomorrow: the mistakes that cost a year on the left, what
// the right steps lead to on the right. When the section scrolls into view the
// mistakes come in one by one, then each outcome gets its check.

const I = ({ d }: { d: string[] }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {d.map((p) => (
      <path key={p} d={p} />
    ))}
  </svg>
);

const MISTAKES: { title: string; cost: string; fix: string; href: string; icon: ReactNode }[] = [
  {
    title: "Missed a scholarship deadline",
    cost: "+1 year",
    fix: "Scholarship Calendar",
    href: "/scholarships",
    icon: <I d={["M4 5.5h16v14H4z", "M4 10h16M8.5 3.5v4M15.5 3.5v4", "M10 13.5l4 4M14 13.5l-4 4"]} />,
  },
  {
    title: "English score below the cut-off",
    cost: "Rejected",
    fix: "Test preparation",
    href: "/ielts",
    icon: <I d={["M4 17a8 8 0 0 1 16 0", "M12 17l-3.5-6"]} />,
  },
  {
    title: "Applied where you don't fit",
    cost: "Fees wasted",
    fix: "University Finder",
    href: "/universities",
    icon: <I d={["M3 9.5L12 5l9 4.5-9 4.5z", "M7 12v4c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5v-4"]} />,
  },
  {
    title: "Emailed the wrong professors",
    cost: "No replies",
    fix: "Find your Professor",
    href: "/lab-kemon",
    icon: <I d={["M3.5 6h17v12.5h-17z", "M4.5 7.5l7.5 6 7.5-6"]} />,
  },
  {
    title: "No paper or poster on your CV",
    cost: "Weak profile",
    fix: "Conference Calendar",
    href: "/conferences",
    icon: <I d={["M7 3.5h7l4 4v13H6.5v-17z", "M14 3.5V8h4", "M9.5 12.5h5M9.5 16h3"]} />,
  },
  {
    title: "Weak proof of funds for the visa",
    cost: "Visa refused",
    fix: "Visa stories",
    href: "/visa-stories",
    icon: <I d={["M3.5 6.5h17v12h-17z", "M3.5 10.5h17M7.5 15h3"]} />,
  },
];

const OUTCOMES = [
  "An admission offer you chose with care",
  "Funding that covers tuition and pays a stipend",
  "A professor who replied, a lab you checked",
  "A visa, a room and a ticket, all sorted",
  "A first paper, a first talk, a career ahead",
];

// Seconds: the mistakes come in first, then the outcomes are checked off.
const MISTAKE_STEP = 0.12;
const OUTCOMES_AT = 0.35 + MISTAKES.length * MISTAKE_STEP;
const OUTCOME_STEP = 0.22;

export function TodayTomorrow() {
  const ref = useRef<HTMLElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);
  const tomorrowRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [today, setToday] = useState(false);
  const [tomorrow, setTomorrow] = useState(false);
  // Side by side, the outcomes wait for the mistakes; stacked on a phone, each
  // half plays when it scrolls into view.
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !todayRef.current || !tomorrowRef.current) return;
    // Static HTML shows everything; only hide it to play the reveal when the
    // section is still below the fold once the script runs.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.7) return;
    setWide(window.matchMedia("(min-width: 1024px)").matches);
    setArmed(true);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (e.target === todayRef.current) setToday(true);
          if (e.target === tomorrowRef.current) setTomorrow(true);
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    io.observe(todayRef.current);
    io.observe(tomorrowRef.current);
    return () => io.disconnect();
  }, []);

  const todayState = !armed || today ? "tt-in" : "tt-wait";
  const tomorrowState = !armed || (wide ? today : tomorrow) ? "tt-in" : "tt-wait";
  const outcomesAt = wide ? OUTCOMES_AT : 0.2;

  return (
    <section ref={ref} className="bg-paper py-20 sm:py-24" aria-labelledby="tt-today">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative -mx-6 grid sm:mx-0 lg:grid-cols-2">
          {/* Today: what goes wrong without guidance. */}
          <div ref={todayRef} className={`bg-soft p-6 sm:p-10 lg:pr-16 ${todayState}`}>
            <h2 id="tt-today" className="font-display text-[clamp(38px,4.6vw,60px)] leading-none tracking-[-0.035em] text-ink">
              Easi today,
            </h2>
            <p className="mt-5 font-body text-[16px] font-semibold text-ink">The problem we solve.</p>
            <p className="mt-1 max-w-md font-body text-[16px] leading-relaxed text-sub">
              Without the right guidance, one wrong move can cost you a year.
            </p>

            <ul className="mt-8 grid list-none gap-2.5 p-0">
              {MISTAKES.map((m, i) => (
                <li key={m.title} className="tt-mistake" style={{ transitionDelay: `${0.15 + i * MISTAKE_STEP}s` }}>
                  <Link
                    href={m.href}
                    className="group flex items-center gap-3.5 border border-line bg-white p-3 pr-3.5 no-underline transition-colors duration-200 hover:border-ink sm:p-3.5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center bg-soft text-ink [&>svg]:h-5 [&>svg]:w-5">
                      {m.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-body text-[14.5px] font-medium leading-snug text-ink sm:text-[15px]">
                        {m.title}
                      </span>
                      <span className="block font-body text-[12.5px] text-sub transition-colors group-hover:text-blue">
                        Fix · {m.fix} →
                      </span>
                      <span className="mt-1.5 inline-block bg-[#FFE3DE] px-2 py-0.5 font-body text-[11.5px] font-medium text-[#D9302B] sm:hidden">
                        {m.cost}
                      </span>
                    </span>
                    <span className="hidden shrink-0 bg-[#FFE3DE] sm:block px-2.5 py-1 font-body text-[12px] font-medium text-[#D9302B]">
                      {m.cost}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* The turn from one to the other. */}
          <div
            aria-hidden
            className={`tt-turn z-10 mx-auto -my-6 grid h-12 w-12 place-items-center bg-blue text-white shadow-[0_10px_28px_-8px_rgba(30,79,255,0.7)] lg:absolute lg:left-1/2 lg:top-1/2 lg:my-0 lg:-ml-7 lg:-mt-7 lg:h-14 lg:w-14 ${tomorrowState}`}
            style={{ transitionDelay: `${outcomesAt - 0.2}s` }}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 rotate-90 lg:rotate-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </div>

          {/* Tomorrow: where the right steps lead. */}
          <div ref={tomorrowRef} className={`flex flex-col bg-ink p-6 pt-10 text-white sm:p-10 lg:pl-16 ${tomorrowState}`}>
            <p className="font-display text-[clamp(38px,4.6vw,60px)] leading-none tracking-[-0.035em]">
              <Accent>Abroad tomorrow.</Accent>
            </p>
            <p className="mt-5 font-body text-[16px] text-white/70">Where the right steps lead.</p>

            <ul className="mt-8 grid list-none gap-2.5 p-0">
              {OUTCOMES.map((o, i) => (
                <li
                  key={o}
                  className="tt-outcome flex items-center gap-3.5 border border-white/12 bg-white/[0.04] p-4 sm:p-5"
                  style={{ transitionDelay: `${outcomesAt + i * OUTCOME_STEP}s` }}
                >
                  <span className="tt-check grid h-7 w-7 shrink-0 place-items-center border border-white/30">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  <span className="font-body text-[15px] leading-snug sm:text-[16px]">{o}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/readiness" variant="primary" className="justify-center px-6 py-3.5 text-[16px]">
                Start Abroad Readiness
              </Button>
              <Link
                href="/mentoring"
                className="inline-flex items-center justify-center border border-white/30 px-6 py-3.5 font-body text-[16px] text-white no-underline transition-colors hover:border-white hover:bg-white/10"
              >
                Talk to a mentor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
