"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Kicker, Accent } from "@/components/PageHeader";

// The whole journey in five stages of four tools each. On wide screens a rail
// stays beside the cards: its line fills and a plane rides down it as you
// scroll, and each stage's cards rise in as the stage comes into view.

type Item = { title: string; desc: string; href?: string; icon: ReactNode };
type Stage = { name: string; sub: string; items: Item[] };

const I = ({ d }: { d: string[] }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {d.map((p) => (
      <path key={p} d={p} />
    ))}
  </svg>
);

const STAGES: Stage[] = [
  {
    name: "Plan",
    sub: "Know where you stand",
    items: [
      {
        title: "Study Abroad Readiness",
        desc: "Nine quick questions for a readiness score, a timeline and a to-do list.",
        href: "/readiness",
        icon: <I d={["M4 17a8 8 0 0 1 16 0", "M12 17l4.5-5"]} />,
      },
      {
        title: "Find my research direction",
        desc: "From courses you enjoyed to three topics you can start this month.",
        href: "/research-direction",
        icon: <I d={["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M15.5 8.5l-2 5-5 2 2-5z"]} />,
      },
      {
        title: "Test preparation",
        desc: "Free IELTS mock tests, with coaches for IELTS, GRE and GMAT.",
        href: "/ielts",
        icon: <I d={["M5 19l4-1 10-10-3-3L6 15z", "M14 7l3 3"]} />,
      },
      {
        title: "Transcript evaluation",
        desc: "Which evaluation you need, from which agency, and what to send.",
        icon: <I d={["M6 3h9l3 3v15H6z", "M9 14l2 2 4-4"]} />,
      },
    ],
  },
  {
    name: "Find",
    sub: "Programs, people and money",
    items: [
      {
        title: "University Finder",
        desc: "A ranked shortlist from your CGPA, major, country and budget.",
        href: "/universities",
        icon: <I d={["M3 10l9-6 9 6", "M5 10v8M9.7 10v8M14.3 10v8M19 10v8", "M3 20h18"]} />,
      },
      {
        title: "Find your Professor",
        desc: "Professor ratings, lab culture and funding reviews before you write.",
        href: "/lab-kemon",
        icon: <I d={["M10 4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z", "M3.5 20c.5-3.5 3.2-6 6.5-6", "M17 13a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", "M19.2 18.2L21 20"]} />,
      },
      {
        title: "Scholarship Calendar",
        desc: "Every upcoming deadline in one calendar, with official links.",
        href: "/scholarships",
        icon: <I d={["M3 5h18v16H3z", "M3 10h18", "M8 3v4M16 3v4"]} />,
      },
      {
        title: "Conference Calendar",
        desc: "Conferences, research fests and paper deadlines, at home and abroad.",
        href: "/conferences",
        icon: <I d={["M9 3h6v11H9z", "M5 11a7 7 0 0 0 14 0", "M12 18v3"]} />,
      },
    ],
  },
  {
    name: "Apply",
    sub: "Documents and guidance",
    items: [
      {
        title: "Application Studio",
        desc: "Your CV in five templates, plus your statement, proposal and references.",
        href: "/application-studio",
        icon: <I d={["M6 3h12v18H6z", "M9 8h6M9 12h6M9 16h3"]} />,
      },
      {
        title: "Mentoring",
        desc: "Book a session with students and alumni who already made the move.",
        href: "/mentoring",
        icon: <I d={["M4 5h11v8H8l-4 3z", "M15 9h5v8l-3-2h-5v-2"]} />,
      },
      {
        title: "1:1 Research Mentoring",
        desc: "Turn your topic into a question, a method and a proposal.",
        href: "/research-mentoring",
        icon: <I d={["M9 3h6", "M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3", "M7.5 15h9"]} />,
      },
      {
        title: "Lab Kemon",
        desc: "What a lab is really like: supervision, funding and work culture.",
        href: "/lab-kemon",
        icon: <I d={["M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3l-5.5 2.9 1-6.2L3 9.6l6.2-.9z"]} />,
      },
    ],
  },
  {
    name: "Go",
    sub: "Visa, room, ticket and bags",
    items: [
      {
        title: "Visa stories",
        desc: "Real visa interviews, documents and outcomes from students who went.",
        href: "/visa-stories",
        icon: <I d={["M6 3h12v18H6z", "M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", "M9 17h6"]} />,
      },
      {
        title: "Housing and flights",
        desc: "Where to live, what the flight costs and what a month costs.",
        href: "/resources",
        icon: <I d={["M3 11l9-7 9 7", "M5 10v10h14V10", "M10 20v-6h4v6"]} />,
      },
      {
        title: "Fees and funds",
        desc: "What your visa asks you to show, and how to pay fees from Bangladesh.",
        icon: <I d={["M3 6h18v12H3z", "M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"]} />,
      },
      {
        title: "Packing list",
        desc: "What to buy before you fly and after you land, for your country and season.",
        icon: <I d={["M5 8h14l-1 13H6z", "M9 8a3 3 0 0 1 6 0"]} />,
      },
    ],
  },
  {
    name: "Grow",
    sub: "Work, stories and learning",
    items: [
      {
        title: "Journey stories",
        desc: "Real admissions and journeys shared by Bangladeshi students.",
        href: "/stories",
        icon: <I d={["M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z", "M4 19V5"]} />,
      },
      {
        title: "Jobs and careers",
        desc: "Paid PhD posts abroad, research jobs at home, and work rules by country.",
        icon: <I d={["M3 7h18v13H3z", "M9 7V4h6v3", "M3 12h18"]} />,
      },
      {
        title: "Guides and official portals",
        desc: "Plain guides on funding and documents, and each country's official portal.",
        icon: <I d={["M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z", "M9 4v14M15 6v14"]} />,
      },
      {
        title: "Podcast and magazine",
        desc: "Conversations and a monthly letter on funding, research and life abroad.",
        icon: <I d={["M4 15a8 8 0 0 1 16 0", "M3 14h4v6H3zM17 14h4v6h-4z"]} />,
      },
    ],
  },
];

const LIVE = STAGES.flatMap((s) => s.items).filter((i) => i.href).length;

export function Journey() {
  const listRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<boolean[]>(() => STAGES.map(() => false));
  const [armed, setArmed] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cards start visible in the static HTML; only hide the ones still below
    // the fold once the script is running, so nothing depends on it.
    const els = stageRefs.current.filter((e): e is HTMLElement => !!e);
    const below = els.map((e) => e.getBoundingClientRect().top > window.innerHeight * 0.85);
    setSeen(below.map((b) => !b));
    setArmed(true);

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = els.indexOf(e.target as HTMLElement);
          setSeen((s) => (s[i] ? s : s.map((v, j) => (j === i ? true : v))));
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    const current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((e) => {
      reveal.observe(e);
      current.observe(e);
    });

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = listRef.current?.getBoundingClientRect();
        if (!r) return;
        const p = (window.innerHeight * 0.5 - r.top) / r.height;
        setProgress(Math.min(1, Math.max(0, p)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      reveal.disconnect();
      current.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (i: number) => stageRefs.current[i]?.scrollIntoView({ block: "start", behavior: "smooth" });

  return (
    <section id="features" className="bg-paper pb-24 pt-4">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <Kicker>Five stages, one platform</Kicker>
            <h2 className="mt-5 font-display text-[clamp(38px,5vw,66px)] leading-[1.04] tracking-[-0.035em] text-ink">
              From your first question to <Accent>your first day abroad.</Accent>
            </h2>
          </div>
          <p className="max-w-110 font-body text-[17px] leading-relaxed text-sub lg:justify-self-end lg:pb-2">
            Plan, find, apply, go and grow. {LIVE} tools are open today, all free except mentoring, and the rest are
            on the way.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          {/* The rail: stays in view while the stages scroll past. */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="font-body text-[13px] uppercase tracking-[0.16em] text-sub">
                Stage {String(active + 1).padStart(2, "0")} of 05
              </p>
              <p key={active} className="mt-3 animate-appear font-display text-[64px] leading-none tracking-[-0.03em] text-ink">
                {STAGES[active].name}
              </p>
              <p className="mt-3 font-body text-[16px] text-sub">{STAGES[active].sub}</p>

              <ol className="relative mt-10 list-none p-0">
                <span aria-hidden className="absolute bottom-7 left-[6px] top-7 w-0.5 bg-line" />
                <span
                  aria-hidden
                  className="absolute left-[6px] top-7 w-0.5 bg-blue"
                  style={{ height: `calc((100% - 56px) * ${progress})` }}
                />
                <span
                  aria-hidden
                  className="absolute left-[-3px] z-10 bg-paper py-0.5 text-blue"
                  style={{ top: `calc(28px + (100% - 56px) * ${progress} - 12px)` }}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 rotate-90" fill="currentColor">
                    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
                  </svg>
                </span>
                {STAGES.map((s, i) => (
                  <li key={s.name} className="relative">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      className="group flex w-full items-center gap-4 py-5 text-left"
                    >
                      <span
                        className={`relative z-[1] h-3.5 w-3.5 border-2 transition-colors duration-300 ${
                          i <= active ? "border-blue bg-blue" : "border-line bg-paper"
                        }`}
                      />
                      <span
                        className={`font-body text-[15px] transition-colors duration-300 ${
                          i === active ? "font-medium text-ink" : "text-sub group-hover:text-ink"
                        }`}
                      >
                        <span className="mr-2 text-[12px] tracking-[0.12em]">{String(i + 1).padStart(2, "0")}</span>
                        {s.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <div ref={listRef} className="flex flex-col gap-16 sm:gap-20">
            {STAGES.map((s, si) => (
              <section
                key={s.name}
                ref={(el) => {
                  stageRefs.current[si] = el;
                }}
                aria-labelledby={`stage-${si}`}
                className={`scroll-mt-28 ${armed && !seen[si] ? "jr-wait" : "jr-in"}`}
              >
                <div className="flex items-end gap-4 border-b border-line pb-4">
                  <span className="font-display text-[56px] leading-[0.8] tracking-[-0.04em] text-blue sm:text-[72px]">
                    {String(si + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 id={`stage-${si}`} className="font-display text-[30px] leading-none tracking-[-0.02em] text-ink sm:text-[36px]">
                      {s.name}
                    </h3>
                    <p className="mt-1.5 font-body text-[15px] text-sub">{s.sub}</p>
                  </div>
                </div>

                <ul className="mt-6 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
                  {s.items.map((it, ii) => (
                    <li key={it.title} className="jr-card" style={{ transitionDelay: `${ii * 90}ms` }}>
                      {it.href ? (
                        <Link
                          href={it.href}
                          className="group flex h-full flex-col border border-line bg-white p-6 no-underline transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_18px_40px_-24px_rgba(11,18,32,0.35)]"
                        >
                          <Card it={it} n={`${si + 1}.${ii + 1}`} live />
                        </Link>
                      ) : (
                        <div className="flex h-full flex-col border border-dashed border-line p-6">
                          <Card it={it} n={`${si + 1}.${ii + 1}`} />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ it, n, live = false }: { it: Item; n: string; live?: boolean }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className={`grid h-12 w-12 place-items-center transition-colors duration-300 [&>svg]:h-6 [&>svg]:w-6 ${
            live ? "bg-soft text-blue group-hover:bg-blue group-hover:text-white" : "bg-softer text-sub"
          }`}
        >
          {it.icon}
        </span>
        <span className="font-body text-[12px] tracking-[0.12em] text-sub">{n}</span>
      </div>
      <h4 className="mt-5 font-display text-[24px] leading-tight tracking-[-0.02em] text-ink">{it.title}</h4>
      <p className="mb-5 mt-2 flex-1 font-body text-[15px] leading-relaxed text-sub">{it.desc}</p>
      {live ? (
        <span className="inline-flex items-center gap-2 font-body text-[14.5px] font-medium text-ink">
          Open
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      ) : (
        <span className="self-start bg-softer px-2.5 py-1 font-body text-[12px] text-sub">Coming soon</span>
      )}
    </>
  );
}
