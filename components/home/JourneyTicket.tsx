"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Accent, Kicker } from "@/components/PageHeader";

// Destinations the board flips through, in airport codes.
const DESTINATIONS = [
  { code: "LHR", city: "London, UK" },
  { code: "YYZ", city: "Toronto, Canada" },
  { code: "MUC", city: "Munich, Germany" },
  { code: "MEL", city: "Melbourne, Australia" },
  { code: "BOS", city: "Boston, USA" },
  { code: "NRT", city: "Tokyo, Japan" },
];

const FLIP_MS = 2600;

const FIELDS = [
  { label: "Free tools", value: "5" },
  { label: "Official source links", value: "100%" },
  { label: "Destinations covered", value: "30" },
];

const STUB_POINTS = [
  "Nine quick questions",
  "Readiness score out of 100",
  "A timeline for your intake",
  "A personal to-do list",
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

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Airport code on split-flap tiles; `animate` flips each letter in turn. */
function Board({ code, animate }: { code: string; animate: boolean }) {
  return (
    <span className="inline-flex gap-[0.08em] font-display text-[clamp(34px,4.6vw,58px)]" aria-label={code}>
      {code.split("").map((ch, i) => (
        <span
          key={`${code}-${i}`}
          aria-hidden
          className={`flap-tile ${animate ? "flap-anim" : ""}`}
          style={{ animationDelay: `${i * 110}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

/** Dashed flight path with a plane flying it on a loop. */
function FlightPath({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 220 70" className="h-auto w-full max-w-60" aria-hidden>
      <path id="ticket-route" d="M8 58 Q110 -14 212 58" fill="none" stroke="#D9D2C6" strokeWidth="2" strokeDasharray="5 6" />
      <circle cx="8" cy="58" r="4" fill="#0B1220" />
      <circle cx="212" cy="58" r="4" fill="#fff" stroke="#0B1220" strokeWidth="2" />
      <g>
        <path d="M-9 0 L9 0 M2 -7 L9 0 L2 7" fill="none" stroke="#0B1220" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        {still ? (
          <animateMotion dur="1s" fill="freeze" keyPoints="0.5;0.5" keyTimes="0;1" rotate="auto">
            <mpath href="#ticket-route" />
          </animateMotion>
        ) : (
          <animateMotion dur={`${FLIP_MS}ms`} repeatCount="indefinite" rotate="auto">
            <mpath href="#ticket-route" />
          </animateMotion>
        )}
      </g>
    </svg>
  );
}

// Deterministic barcode bars, so server and client render the same thing.
const BARS = (() => {
  let seed = 2026;
  let x = 0;
  return Array.from({ length: 46 }, (_, i) => {
    seed = (seed * 9301 + 49297) % 233280;
    const w = 1 + Math.floor((seed / 233280) * 3);
    const bar = { x, w, ink: i % 2 === 0 };
    x += w + (i % 3 === 0 ? 1.5 : 1);
    return bar;
  });
})();

function Barcode() {
  return (
    <svg viewBox="0 0 160 40" preserveAspectRatio="none" className="h-10 w-full" aria-hidden>
      {BARS.filter((b) => b.ink).map((b) => (
        <rect key={b.x} x={b.x} y="0" width={b.w} height="40" fill="rgba(255,255,255,0.35)" />
      ))}
    </svg>
  );
}

const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (cb: () => void) => {
  const mq = window.matchMedia(motionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function JourneyTicket() {
  const [idx, setIdx] = useState(0);
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(motionQuery).matches,
    () => false,
  );

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % DESTINATIONS.length), FLIP_MS);
    return () => clearInterval(id);
  }, [reduced]);

  const dest = DESTINATIONS[idx];

  // The stub tilts as the ticket scrolls into view, like it's being torn off.
  const ticketRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ticketRef.current;
    if (!el || reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const seen = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      el.style.setProperty("--tilt", Math.min(1, Math.max(0, (seen - 0.2) / 0.35)).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

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

        <div
          ref={ticketRef}
          className="mx-auto mt-14 grid max-w-6xl grid-cols-1 lg:grid-cols-[1fr_340px]"
          style={{ "--tilt": reduced ? 0.6 : 0 } as CSSProperties}
        >
          {/* Main pass */}
          <div className="overflow-hidden rounded-t-[26px] bg-white lg:rounded-l-[26px] lg:rounded-tr-none">
            <div className="flex items-center justify-between gap-4 bg-soft px-6 py-4.5 sm:px-8">
              <span className="font-display text-[22px] text-ink">EasiAbroad</span>
              <span className="font-body text-[13px] text-sub">Boarding pass · Flight EA 2026</span>
            </div>

            <div className="grid grid-cols-[auto_1fr_auto] items-end gap-3 px-6 pb-8 pt-9 sm:gap-6 sm:px-8">
              <div>
                <Board code="DAC" animate={false} />
                <p className="mt-2.5 font-body text-[14px] text-sub">Dhaka, where you are now</p>
              </div>
              <div className="flex flex-col items-center pb-8">
                <FlightPath still={reduced} />
                <span className="mt-1 hidden font-body text-[12.5px] text-sub sm:block">Clear next steps</span>
              </div>
              <div className="text-right">
                <Board code={dest.code} animate={!reduced} />
                <p key={dest.city} className="ill-up mt-2.5 font-body text-[14px] text-sub" aria-live="polite">
                  {dest.city}
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-3 border-t border-line">
              {FIELDS.map((f, i) => (
                <div key={f.label} className={`px-5 py-5 sm:px-8 ${i > 0 ? "border-l border-line" : ""}`}>
                  <dt className="font-body text-[12.5px] text-sub sm:text-[13px]">{f.label}</dt>
                  <dd className="mt-2 font-display text-[clamp(26px,3vw,34px)] leading-none text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Tear-off stub: dark, scalloped, tilting as you scroll. */}
          <div
            className="relative z-10 origin-top-left transition-transform duration-300 ease-out lg:origin-left"
            style={{
              transform: "rotate(calc(var(--tilt) * 4deg)) translate(calc(var(--tilt) * 6px), calc(var(--tilt) * -4px))",
            }}
          >
            <div className="stub-scallop flex h-full flex-col overflow-hidden rounded-b-[26px] bg-[#1C1E22] text-white shadow-[0_30px_60px_-30px_rgba(11,18,32,0.6)] lg:rounded-r-[26px] lg:rounded-bl-none">
              <div className="bg-[#2A2C31] px-7 py-5 lg:pl-9">
                <h3 className="font-display text-[24px] leading-tight tracking-[-0.01em]">
                  Start your readiness check
                </h3>
              </div>
              <div className="flex flex-1 flex-col px-7 pb-6 pt-6 lg:pl-9">
                <ul className="grid list-none gap-3 p-0">
                  {STUB_POINTS.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 font-body text-[15px] text-white/85">
                      <Check /> {p}
                    </li>
                  ))}
                </ul>
                <Button
                  href="/readiness"
                  variant="primary"
                  className="mt-7 w-full rounded-pill bg-red! py-3.5 text-[16px] shadow-none! hover:bg-[#E62F3B]!"
                >
                  Check my readiness
                </Button>
                <p className="mt-2.5 text-center font-body text-[12.5px] text-white/50">
                  Free · takes about five minutes
                </p>
                <div className="mt-auto pt-6">
                  <Barcode />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
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
