"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { SCHOLARSHIPS } from "@/data/scholarships";
import {
  daysUntil,
  isClosingSoon,
  sortScholarshipsByDeadline,
  withUpcomingDeadlines,
} from "@/lib/scholarship-match";

/** Each scene's entrance takes about a second, then it holds until this is up. */
const SCENE_MS = 3000;

const at = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

type Scene = {
  key: string;
  label: string;
  caption: string;
  href: string;
  tint: string;
  deep: string;
  render: () => ReactNode;
};

/* ------------------------------------------------------------------ */
/* University Finder: slide your CGPA up and matching campuses rise in */

function Campus({ roof, wall }: { roof: string; wall: string }) {
  return (
    <svg viewBox="0 0 80 56" className="h-20 w-full" aria-hidden>
      <path d="M12 22 L40 8 L68 22 Z" fill={roof} />
      <rect x="16" y="22" width="48" height="4" fill={roof} opacity="0.75" />
      {[20, 31, 42, 53].map((x) => (
        <rect key={x} x={x} y="28" width="7" height="20" rx="2" fill={wall} />
      ))}
      <rect x="12" y="48" width="56" height="5" rx="2" fill={roof} opacity="0.35" />
      <path d="M40 8 V-2" stroke="#0B1220" strokeWidth="1.5" />
      <path d="M40.5 -1.5 h11 l-3 3.5 3 3.5 h-11z" fill="#FF3B47" className="ill-wave" />
    </svg>
  );
}

function UniversityScene() {
  const campuses = [
    { flag: "🇩🇪", name: "TU Munich", pct: 94, roof: "#1E4FFF", tint: "#DCE5FF" },
    { flag: "🇨🇦", name: "Waterloo", pct: 89, roof: "#FF3B47", tint: "#FFE2DD" },
    { flag: "🇦🇺", name: "Monash", pct: 85, roof: "#1F9D61", tint: "#D9F0E2" },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="ill-up rounded-[20px] bg-white px-4 py-4" style={at(0)}>
        <div className="flex items-center justify-between font-body text-[13px]">
          <span className="text-sub">Your CGPA</span>
          <span className="ill-pop font-display text-[22px] leading-none text-ink" style={at(550)}>
            3.62
          </span>
        </div>
        <div className="relative mt-3 h-2 rounded-pill bg-[#EAF0FF]">
          <span
            className="ill-fill absolute inset-y-0 left-0 w-[81%] rounded-pill bg-blue"
            style={{ ...at(100), animationDuration: "700ms" }}
          />
          <span
            className="ill-knob absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-blue bg-white shadow-[0_2px_6px_rgba(30,79,255,0.35)]"
            style={{ ...at(100), animationDuration: "700ms" }}
          />
        </div>
      </div>

      <div className="my-auto grid grid-cols-3 gap-2.5 py-3">
        {campuses.map((c, i) => (
          <div
            key={c.name}
            style={at(250 + i * 120)}
            className="ill-up overflow-hidden rounded-[18px] bg-white"
          >
            <div className="px-2 pt-3" style={{ background: c.tint }}>
              <div className="ill-bob" style={at(i * 600)}>
                <Campus roof={c.roof} wall="#fff" />
              </div>
            </div>
            <div className="px-2.5 pb-3 pt-2 text-center">
              <div className="truncate font-body text-[13px] text-ink">
                <span className="mr-1">{c.flag}</span>
                {c.name}
              </div>
              <div
                style={{ ...at(500 + i * 100), background: c.roof }}
                className="ill-pop mx-auto mt-1.5 w-fit rounded-pill px-2.5 py-0.5 font-body text-[12px] text-white"
              >
                {c.pct}% match
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={at(650)}
        className="ill-slide flex items-center gap-3 rounded-[18px] bg-ink px-4 py-3 text-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="ill-twinkle shrink-0">
          <path d="M12 2l2.6 6.6L21 11l-6.4 2.4L12 20l-2.6-6.6L3 11l6.4-2.4z" fill="#FFE09A" />
        </svg>
        <span className="min-w-0 flex-1 truncate font-body text-[14px]">
          Best match: Technical University of Munich
        </span>
        <span className="font-display text-[20px] leading-none">94%</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Conference Calendar: a little stage with talk bubbles, then dates   */

function ConferenceScene() {
  const events = [
    { m: "NOV", d: "14", name: "ICCIT 2026", kind: "Conference", place: "Dhaka" },
    { m: "DEC", d: "02", name: "Bangladesh Robotics & AI Fest", kind: "Research fest", place: "Dhaka" },
    { m: "JAN", d: "20", name: "IEEE Access special issue", kind: "Paper deadline", place: "Online" },
  ];
  return (
    <div className="flex h-full flex-col">
      <svg viewBox="0 0 400 150" className="h-36 w-full" aria-hidden>
        {/* spotlight */}
        <path d="M200 0 L140 128 L260 128 Z" fill="#fff" opacity="0.55" className="ill-pulse" />
        {/* podium */}
        <rect x="168" y="86" width="64" height="44" rx="8" fill="#6C4CF1" />
        <rect x="160" y="80" width="80" height="10" rx="5" fill="#8B71F5" />
        {/* speaker */}
        <circle cx="200" cy="52" r="13" fill="#2A1F55" />
        <path d="M178 82 C 180 64, 220 64, 222 82 Z" fill="#2A1F55" />
        {/* mic */}
        <path d="M214 80 L222 64" stroke="#2A1F55" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="223" cy="62" r="3.5" fill="#2A1F55" />
        {/* stage */}
        <rect x="70" y="128" width="260" height="8" rx="4" fill="#D6CBFF" />
        {/* talk bubbles */}
        <g className="ill-pop" style={at(300)}>
          <rect x="62" y="30" width="78" height="30" rx="12" fill="#fff" />
          <rect x="74" y="40" width="40" height="4" rx="2" fill="#D6CBFF" />
          <rect x="74" y="48" width="54" height="4" rx="2" fill="#D6CBFF" />
        </g>
        <g className="ill-pop" style={at(450)}>
          <rect x="266" y="18" width="84" height="30" rx="12" fill="#fff" />
          <text x="308" y="38" textAnchor="middle" className="fill-[#6C4CF1] font-body text-[12px]">
            Q&amp;A ✦
          </text>
        </g>
        <g className="ill-twinkle" style={at(200)}>
          <path d="M120 96 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill="#FF3B47" />
        </g>
        <g className="ill-twinkle" style={at(900)}>
          <path d="M290 88 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5z" fill="#6C4CF1" />
        </g>
      </svg>

      <ul className="mt-auto grid list-none grid-cols-1 gap-2 p-0">
        {events.map((e, i) => (
          <li
            key={e.name}
            style={at(200 + i * 120)}
            className="ill-slide flex items-center gap-3 rounded-[18px] bg-white px-3.5 py-2.5"
          >
            <span className="grid w-12 shrink-0 overflow-hidden rounded-[12px] text-center">
              <span className="bg-[#6C4CF1] py-0.5 font-body text-[10.5px] tracking-[0.08em] text-white">
                {e.m}
              </span>
              <span className="bg-[#F0EBFF] py-1 font-display text-[20px] leading-none text-ink">{e.d}</span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-body text-[14.5px] text-ink">{e.name}</span>
              <span className="block font-body text-[12.5px] text-sub">{e.place}</span>
            </span>
            <span className="shrink-0 rounded-pill bg-[#F0EBFF] px-2.5 py-1 font-body text-[12px] text-[#5A3FD6]">
              {e.kind}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Find your Professor: a search that types itself, then a profile     */

function ProfessorScene() {
  const scores = [
    { label: "Mentorship", v: 92 },
    { label: "Funding", v: 86 },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="ill-up flex items-center gap-2.5 rounded-pill bg-white px-4 py-3" style={at(50)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="7" stroke="#1F9D61" strokeWidth="2.2" />
          <path d="M20 20l-3.5-3.5" stroke="#1F9D61" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        <span className="font-body text-[14.5px] text-ink">
          <span className="ill-type" style={{ ...at(100), animationDuration: "650ms" }}>
            Machine learning · Germany
          </span>
          <span className="ill-caret ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-ink" />
        </span>
      </div>

      <div className="relative mt-4 flex-1">
        {/* other professors drifting in the background */}
        {[
          { l: "8%", t: "6%", c: "#BFE5CC", i: "SM", d: 0 },
          { l: "78%", t: "2%", c: "#FFE09A", i: "KO", d: 700 },
          { l: "86%", t: "56%", c: "#D6CBFF", i: "RT", d: 1300 },
        ].map((a) => (
          <span
            key={a.i}
            style={{ left: a.l, top: a.t, background: a.c, animationDelay: `${a.d}ms` }}
            className="ill-bob absolute grid h-10 w-10 place-items-center rounded-full font-body text-[12px] text-ink/70"
          >
            {a.i}
          </span>
        ))}

        <div
          style={at(450)}
          className="ill-pop relative mx-auto mt-6 w-[86%] rounded-[22px] bg-white p-4.5 shadow-[0_18px_40px_-24px_rgba(11,18,32,0.35)]"
        >
          <div className="flex items-center gap-3">
            <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden className="shrink-0">
              <circle cx="24" cy="24" r="24" fill="#E7F5EC" />
              <circle cx="24" cy="19" r="8" fill="#1F9D61" />
              <path d="M10 41c2-9 26-9 28 0" fill="#1F9D61" />
            </svg>
            <div className="min-w-0">
              <div className="font-display text-[21px] leading-tight text-ink">Prof. Anna Richter</div>
              <div className="font-body text-[12.5px] text-sub">TU Munich · Learning Systems Lab</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1" aria-hidden>
            {[0, 1, 2, 3, 4].map((s) => (
              <svg key={s} width="15" height="15" viewBox="0 0 24 24" className="ill-pop" style={at(600 + s * 60)}>
                <path
                  d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 16.9l-6.2 3.4 1.6-6.8L2.2 8.9l6.9-.6z"
                  fill={s < 4 ? "#E8A317" : "#FFE09A"}
                />
              </svg>
            ))}
            <span className="ml-1 font-body text-[13px] text-ink">4.6</span>
          </div>
          <div className="mt-3 grid gap-2">
            {scores.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <span className="w-20 font-body text-[12px] text-sub">{s.label}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-pill bg-[#E7F5EC]">
                  <span
                    style={{ ...at(700 + i * 100), width: `${s.v}%`, animationDuration: "700ms" }}
                    className="ill-fill block h-full rounded-pill bg-[#1F9D61]"
                  />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Accepting PhD", "Funded"].map((t, i) => (
              <span
                key={t}
                style={at(850 + i * 90)}
                className="ill-pop rounded-pill bg-[#E7F5EC] px-2.5 py-1 font-body text-[12px] text-[#17784A]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scholarship Calendar: the month fills in, deadlines get circled      */

function ScholarshipScene() {
  const next = useMemo(
    () => sortScholarshipsByDeadline(withUpcomingDeadlines(SCHOLARSHIPS)).slice(0, 3),
    []
  );
  const first = new Date(next[0].deadline);
  const year = first.getFullYear();
  const month = first.getMonth();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7; // Monday first
  const days = new Date(year, month + 1, 0).getDate();
  const marked = new Set(
    next
      .map((s) => new Date(s.deadline))
      .filter((d) => d.getFullYear() === year && d.getMonth() === month)
      .map((d) => d.getDate())
  );
  const monthLabel = first.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <div className="flex h-full flex-col">
      <div className="relative rounded-[22px] bg-white p-4">
        <svg
          width="42"
          height="34"
          viewBox="0 0 42 34"
          aria-hidden
          className="ill-bob absolute right-4 top-3"
        >
          <path d="M21 2 L41 11 L21 20 L1 11 Z" fill="#0B1220" />
          <path d="M9 15 v8 c6 5 18 5 24 0 v-8 l-12 5z" fill="#0B1220" />
          <path d="M37 13 v10" stroke="#E8A317" strokeWidth="2" />
          <circle cx="37" cy="25" r="2.5" fill="#E8A317" />
        </svg>
        <div className="font-display text-[20px] text-ink">{monthLabel}</div>
        <div className="mt-2 grid grid-cols-7 gap-x-1 gap-y-0.5 text-center font-body text-[11px] text-sub">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
          {Array.from({ length: offset }).map((_, i) => (
            <span key={`b${i}`} />
          ))}
          {Array.from({ length: days }).map((_, i) => {
            const day = i + 1;
            const hit = marked.has(day);
            return (
              <span
                key={day}
                style={at(hit ? 550 : 20 + i * 10)}
                className={`ill-pop mx-auto grid h-5.5 w-5.5 place-items-center rounded-full text-[11px] ${
                  hit ? "bg-[#E8A317] text-white ring-4 ring-[#FFF3D6]" : "text-ink/75"
                }`}
              >
                {day}
              </span>
            );
          })}
        </div>
      </div>

      <ul className="mt-auto grid list-none grid-cols-1 gap-1.5 p-0 pt-3">
        {next.map((s, i) => {
          const soon = isClosingSoon(s.deadline);
          const left = daysUntil(s.deadline);
          return (
            <li
              key={s.id}
              style={at(400 + i * 120)}
              className="ill-slide flex items-center justify-between gap-3 rounded-[16px] bg-white px-3.5 py-2"
            >
              <span className="truncate font-body text-[14px] text-ink">{s.name}</span>
              <span
                className={`shrink-0 rounded-pill px-2.5 py-1 font-body text-[12px] ${
                  soon ? "bg-red/10 text-red" : "bg-[#FFF3D6] text-[#9A6A00]"
                }`}
              >
                {left} days left
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Readiness: a student's score climbs into the green while each area is scored */

const GREEN = "#1F9D61";

function ReadinessScene() {
  const target = 88;
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 900);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => (raf = requestAnimationFrame(tick)), 150);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

  const r = 52;
  const c = 2 * Math.PI * r;
  const areas = [
    { label: "CGPA", value: "3.72", pts: 18 },
    { label: "English", value: "IELTS 7.5", pts: 20 },
    { label: "Research", value: "1 paper", pts: 16 },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center gap-5">
        {/* score */}
        <div className="ill-pop relative h-32 w-32 shrink-0 sm:h-40 sm:w-40" style={at(0)}>
          <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" aria-hidden>
            <defs>
              <linearGradient id="ready-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3CC47C" />
                <stop offset="100%" stopColor="#13804D" />
              </linearGradient>
            </defs>
            <circle cx="64" cy="64" r={r} fill="#fff" stroke="#CDEBD9" strokeWidth="10" />
            <circle
              cx="64"
              cy="64"
              r={r}
              fill="none"
              stroke="url(#ready-ring)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - n / 100)}
            />
          </svg>
          {/* little plane riding the ring */}
          <div
            className="absolute inset-0 transition-transform duration-75"
            style={{ transform: `rotate(${(n / 100) * 360}deg)` }}
            aria-hidden
          >
            <span className="absolute left-1/2 top-0 grid h-6 w-6 -translate-x-1/2 -translate-y-[2px] place-items-center rounded-full bg-white shadow-[0_2px_6px_rgba(19,128,77,0.35)]">
              <svg width="12" height="12" viewBox="0 0 24 24" className="rotate-45">
                <path d="M3 11.5L21 3l-6.5 18-3.2-7.3L3 11.5z" fill={GREEN} />
              </svg>
            </span>
          </div>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <div className="font-display text-[34px] leading-none text-ink sm:text-[44px]">{n}</div>
              <div className="mt-1 font-body text-[10.5px] text-sub sm:text-[11.5px]">out of 100</div>
            </div>
          </div>
        </div>

        {/* areas */}
        <ul className="grid min-w-0 flex-1 list-none grid-cols-1 gap-2 p-0">
          {areas.map((it, i) => (
            <li
              key={it.label}
              style={at(150 + i * 120)}
              className="ill-slide rounded-[14px] bg-white px-3.5 py-2.5"
            >
              <div className="flex items-center justify-between gap-2 font-body text-[13.5px]">
                <span className="truncate text-ink">
                  {it.label}
                  <span className="hidden text-sub sm:inline"> · {it.value}</span>
                </span>
                <span className="text-sub">{it.pts}/20</span>
              </div>
              <span className="mt-1.5 block h-1.5 overflow-hidden rounded-pill bg-[#E3F3EA]">
                <span
                  style={{ ...at(250 + i * 120), width: `${(it.pts / 20) * 100}%`, animationDuration: "700ms" }}
                  className="ill-fill block h-full rounded-pill bg-[#1F9D61]"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* verdict and next step */}
      <div
        style={at(550)}
        className="ill-up mt-3 flex items-center gap-3 rounded-[18px] bg-[#13804D] px-4 py-3 text-white"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[19px] leading-tight">Ready for takeoff</span>
          <span className="block truncate font-body text-[12.5px] text-white/80">
            Next: get a bank solvency letter
          </span>
        </span>
      </div>
    </div>
  );
}

const SCENES: Scene[] = [
  {
    key: "readiness",
    label: "Study Abroad Readiness",
    caption: "A readiness score and a to-do list in five minutes.",
    href: "/readiness",
    tint: "#E3F4EA",
    deep: "#1F9D61",
    render: () => <ReadinessScene />,
  },
  {
    key: "universities",
    label: "University Finder",
    caption: "Ranked matches for your CGPA, major and budget.",
    href: "/universities",
    tint: "#EAF0FF",
    deep: "#1E4FFF",
    render: () => <UniversityScene />,
  },
  {
    key: "conferences",
    label: "Conference Calendar",
    caption: "Conferences, research fests and paper deadlines.",
    href: "/conferences",
    tint: "#F0EBFF",
    deep: "#6C4CF1",
    render: () => <ConferenceScene />,
  },
  {
    key: "professors",
    label: "Find your Professor",
    caption: "Lab culture, funding and honest student reviews.",
    href: "/lab-kemon",
    tint: "#E7F5EC",
    deep: "#1F9D61",
    render: () => <ProfessorScene />,
  },
  {
    key: "scholarships",
    label: "Scholarship Calendar",
    caption: "Every deadline in one calendar, with official links.",
    href: "/scholarships",
    tint: "#FFF3D6",
    deep: "#E8A317",
    render: () => <ScholarshipScene />,
  },
];

/** Hero showcase: steps through each feature with its own animated scene. */
export function FeatureShowcase() {
  const [active, setActive] = useState(0);
  // Each scene remounts when it becomes active, so its entrance plays again.
  const [runs, setRuns] = useState(() => SCENES.map(() => 0));
  const [prev, setPrev] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const go = (i: number) => {
    const next = (i + SCENES.length) % SCENES.length;
    setPrev(active);
    setActive(next);
    setRuns((r) => r.map((v, idx) => (idx === next ? v + 1 : v)));
  };

  const scene = SCENES[active];
  const autoplay = !paused && !hovering && !reducedMotion;

  return (
    <div
      className="relative mx-auto w-full max-w-120 animate-rise"
      style={{ animationDelay: "380ms" }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="relative overflow-hidden rounded-[32px] p-5 transition-colors duration-700 sm:p-6"
        style={{ background: scene.tint }}
      >
        <div className="flex items-center justify-between font-body text-[13px] text-sub">
          <span className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full transition-colors duration-700"
              style={{ background: scene.deep }}
            />
            {scene.label}
          </span>
          <span className="tabular-nums">
            0{active + 1} / 0{SCENES.length}
          </span>
        </div>

        <div className="relative mt-4 h-105" aria-live="polite">
          {SCENES.map((s, i) => (
            <div
              key={`${s.key}-${runs[i]}`}
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-[opacity,transform,filter] ease-out ${
                i === active
                  ? "translate-y-0 opacity-100 blur-0 delay-150 duration-500"
                  : "pointer-events-none -translate-y-2 opacity-0 blur-sm duration-250"
              }`}
            >
              {/* Only the active scene (and the one fading out) renders, so each entrance starts fresh. */}
              {(i === active || i === prev) && s.render()}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-body text-[14px] text-ink/80">{scene.caption}</p>
          <Link
            href={scene.href}
            className="shrink-0 rounded-pill bg-white px-3.5 py-2 font-body text-[13.5px] text-ink no-underline transition-transform hover:-translate-y-0.5"
          >
            Open →
          </Link>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2" role="tablist" aria-label="Features">
        {SCENES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={s.label}
            onClick={() => go(i)}
            className={`group relative h-8 transition-[flex-grow] duration-500 ${
              i === active ? "flex-[2.2]" : "flex-1"
            }`}
          >
            <span
              className="absolute inset-x-0 top-1/2 block h-1.5 -translate-y-1/2 overflow-hidden rounded-pill transition-colors group-hover:opacity-80"
              style={{ background: i === active ? `${s.deep}26` : "rgba(11,18,32,0.1)" }}
            >
              {i < active && <span className="block h-full w-full bg-ink/30" />}
              {i === active && (
                <span
                  key={runs[i]}
                  className="ill-progress block h-full w-full"
                  style={{
                    background: s.deep,
                    animationDuration: `${SCENE_MS}ms`,
                    animationPlayState: autoplay ? "running" : "paused",
                  }}
                  onAnimationEnd={() => autoplay && go(active + 1)}
                />
              )}
            </span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play feature tour" : "Pause feature tour"}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-ink"
        >
          {paused ? (
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
              <path d="M7 4l13 8-13 8z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
