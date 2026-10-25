"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Kicker, Accent } from "@/components/PageHeader";

type Mistake = {
  title: string;
  cost: string;
  fix: string;
  href: string;
  icon: ReactNode;
  /** Final position on wide screens, in px from the centre of the stage. */
  x: number;
  y: number;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const MISTAKES: Mistake[] = [
  {
    title: "Missed a scholarship deadline",
    cost: "+1 year",
    fix: "Scholarship Calendar",
    href: "/scholarships",
    x: -360,
    y: -175,
    icon: (
      <>
        <rect x="4" y="5.5" width="16" height="14" rx="3" {...stroke} />
        <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4M10 13.5l4 4M14 13.5l-4 4" {...stroke} />
      </>
    ),
  },
  {
    title: "English score below the cut-off",
    cost: "Rejected",
    fix: "Readiness check",
    href: "/readiness",
    x: 360,
    y: -175,
    icon: (
      <>
        <path d="M4 17a8 8 0 0 1 16 0M12 17 8.5 11" {...stroke} />
        <circle cx="12" cy="17" r="1.6" fill="currentColor" />
      </>
    ),
  },
  {
    title: "Applied where you don't fit",
    cost: "Fees wasted",
    fix: "University Finder",
    href: "/universities",
    x: -430,
    y: 0,
    icon: <path d="M3 9.5 12 5l9 4.5-9 4.5zM7 12v4c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5v-4" {...stroke} />,
  },
  {
    title: "Emailed the wrong professors",
    cost: "No replies",
    fix: "Find your Professor",
    href: "/lab-kemon",
    x: 430,
    y: 0,
    icon: (
      <>
        <rect x="3.5" y="6" width="17" height="12.5" rx="2.5" {...stroke} />
        <path d="m4.5 7.5 7.5 6 7.5-6" {...stroke} />
      </>
    ),
  },
  {
    title: "No paper or poster on your CV",
    cost: "Weak profile",
    fix: "Conference Calendar",
    href: "/conferences",
    x: -360,
    y: 175,
    icon: <path d="M7 3.5h7l4 4v13H6.5v-17zM14 3.5V8h4M9.5 12.5h5M9.5 16h3" {...stroke} />,
  },
  {
    title: "Weak proof of funds for the visa",
    cost: "Visa refused",
    fix: "Readiness check",
    href: "/readiness",
    x: 360,
    y: 175,
    icon: (
      <>
        <rect x="3.5" y="6.5" width="17" height="12" rx="2.5" {...stroke} />
        <path d="M3.5 10.5h17M7.5 15h3" {...stroke} />
      </>
    ),
  },
];

// Scroll progress (0–1) at which each piece comes in.
const CIRCLE_AT = 0.1;
const PILLS_AT = 0.3;
const PILL_STEP = 0.075;
const FOOTER_AT = PILLS_AT + PILL_STEP * MISTAKES.length + 0.02;

/** 0 before `start`, 1 after `start + span`, linear in between, driven by --p. */
const ramp = (start: number, span: number) => `clamp(0, (var(--p) - ${start}) / ${span}, 1)`;

export function Problem() {
  const sectionRef = useRef<HTMLElement>(null);

  // Everything runs off one CSS variable, so scrolling never re-renders React.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      el.style.setProperty("--fit", Math.min(1, (window.innerWidth / 2 - 190) / 430).toFixed(3));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 1;
      el.style.setProperty("--p", p.toFixed(4));
      // Pull the pills in on narrower laptops so none run off screen.
      el.style.setProperty("--fit", Math.min(1, (window.innerWidth / 2 - 190) / 430).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const heading = ramp(0.03, 0.25);
  const circle = ramp(CIRCLE_AT, 0.18);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] bg-paper motion-reduce:h-auto"
      style={{ "--p": 0 } as CSSProperties}
      aria-labelledby="problem-heading"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden px-6 motion-reduce:relative motion-reduce:h-auto motion-reduce:py-24">
        {/* Heading: fades and lifts away as the circle arrives. */}
        <div
          className="absolute inset-x-6 top-[13vh] mx-auto max-w-210 text-center motion-reduce:hidden"
          style={{
            opacity: `calc(1 - ${heading})`,
            transform: `translateY(calc(${heading} * -70px))`,
          }}
        >
          <Kicker>The problem we solve</Kicker>
          <h2
            id="problem-heading"
            className="mt-5 font-display text-[clamp(38px,5.6vw,76px)] leading-[1.04] tracking-[-0.035em] text-ink"
          >
            Without the right <Accent>guidance</Accent>, one wrong move can cost you a year.
          </h2>
        </div>

        <div className="relative flex w-full max-w-6xl flex-col items-center gap-5 lg:block lg:h-140">
          {/* The dark circle at the centre. */}
          <div
            className="relative grid h-40 w-40 shrink-0 place-items-center rounded-full bg-soft sm:h-48 sm:w-48 lg:absolute lg:left-1/2 lg:top-1/2 lg:-ml-30 lg:-mt-30 lg:h-60 lg:w-60"
            style={{ opacity: circle, transform: `scale(calc(0.5 + ${circle} * 0.5))` }}
          >
            <span
              aria-hidden
              className="absolute inset-2.5 rounded-full border-[5px] border-[#C9C3B9]"
              style={{ opacity: ramp(PILLS_AT, 0.2) }}
            />
            <div className="grid h-[80%] w-[80%] place-items-center rounded-full bg-ink text-center text-white shadow-[0_24px_50px_-20px_rgba(11,18,32,0.55)]">
              <div>
                <div className="font-display text-[clamp(44px,5vw,64px)] italic leading-none">
                  1<span className="ml-1.5 text-[0.4em]">year</span>
                </div>
                <p className="mx-auto mt-2 max-w-28 font-body text-[12.5px] leading-snug text-white/70">
                  lost to one missed step
                </p>
              </div>
            </div>
          </div>

          {/* The mistakes, one after another. */}
          <ul className="grid w-full max-w-md list-none grid-cols-1 gap-2 p-0 lg:contents">
            {MISTAKES.map((m, i) => {
              const k = ramp(PILLS_AT + i * PILL_STEP, 0.09);
              return (
                <li
                  key={m.title}
                  className="pill-drift lg:absolute lg:left-1/2 lg:top-1/2 lg:w-84"
                  style={{ "--x": `calc(${m.x} * var(--fit, 1))`, "--y": m.y, "--k": k, opacity: k } as CSSProperties}
                >
                  <Link
                    href={m.href}
                    className="group flex items-center gap-3.5 rounded-[22px] bg-soft p-2.5 pr-3.5 no-underline transition-colors hover:bg-softer"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] bg-white text-ink">
                      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                        {m.icon}
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-body text-[14.5px] leading-snug text-ink">{m.title}</span>
                      <span className="block font-body text-[12.5px] text-sub transition-colors group-hover:text-ink">
                        Fix · {m.fix} →
                      </span>
                    </span>
                    <span className="shrink-0 rounded-pill bg-[#FFE3DE] px-2.5 py-1 font-body text-[12px] text-[#D9482B]">
                      {m.cost}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className="flex justify-center lg:absolute lg:inset-x-0 lg:-bottom-10"
            style={{ opacity: ramp(FOOTER_AT, 0.08) }}
          >
            <Link
              href="/readiness"
              className="inline-flex items-center gap-3 rounded-pill bg-white py-1.5 pl-5 pr-1.5 font-body text-[14px] text-ink no-underline shadow-[0_10px_30px_-18px_rgba(11,18,32,0.4)]"
            >
              <span className="hidden sm:inline">Every one of these has a fix.</span>
              <span className="rounded-pill bg-blue px-4 py-2 text-white shadow-[0_6px_16px_-6px_rgba(30,79,255,0.6)]">Check my readiness →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
