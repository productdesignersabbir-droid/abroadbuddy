"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AREA_MAX,
  DEGREE_OPTIONS,
  INTAKE_OPTIONS,
  PROFILE_QUESTIONS,
  READINESS_QUESTIONS,
  UNDECIDED,
  type Priority,
  type ProfileKey,
  type ReadinessProfile,
} from "@/data/readiness";
import {
  COUNTRIES,
  COUNTRY_INFO,
  MAJORS,
  type Country,
} from "@/data/universities";
import {
  isAnswered,
  monthsBetween,
  questionFor,
  scoreAnswers,
  type ReadinessAnswers,
} from "@/lib/readiness-score";
import { BDT_PER_USD } from "@/lib/university-match";
import { Button } from "@/components/ui/Button";

const PRIORITY_STYLES: Record<Priority, string> = {
  high: "bg-[#FFE8E6] text-[#C2343E] border-transparent",
  medium: "bg-[#FFF3D6] text-[#9A6A00] border-transparent",
  low: "bg-soft text-sub border-line",
};

// Soft, score-based colours: green once you are in good shape, amber while
// close, a muted red when there is a lot to do.
type Tone = { ring: string; deep: string; tint: string; track: string };

const GOOD: Tone = {
  ring: "#1F9D61",
  deep: "#13804D",
  tint: "#E3F4EA",
  track: "#CDEBD9",
};
const CLOSE: Tone = {
  ring: "#E8A317",
  deep: "#9A6A00",
  tint: "#FFF3D6",
  track: "#FBE3A6",
};
const LOW: Tone = {
  ring: "#E5484D",
  deep: "#B4262E",
  tint: "#FFE8E6",
  track: "#FBC9C5",
};

function toneFor(total: number): Tone {
  if (total >= 60) return GOOD;
  if (total >= 40) return CLOSE;
  return LOW;
}

function barColor(pct: number) {
  if (pct >= 70) return GOOD.ring;
  if (pct >= 50) return CLOSE.ring;
  return LOW.ring;
}

const PRIORITY_LABEL: Record<Priority, string> = {
  high: "Do first",
  medium: "Next",
  low: "Nice to have",
};

function CheckMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// "About you" comes first and personalises everything after it; the five
// scored areas follow.
type Step =
  { type: "profile"; key: ProfileKey } | { type: "score"; index: number };

const PROFILE_ORDER: ProfileKey[] = ["degree", "major", "country", "intake"];

const STEPS: Step[] = [
  ...PROFILE_ORDER.map((key) => ({ type: "profile" as const, key })),
  ...READINESS_QUESTIONS.map((_, index) => ({ type: "score" as const, index })),
];

// Midpoint of each CGPA band, used to prefill University Finder.
const CGPA_FOR_FINDER: Record<string, number> = {
  "cgpa-37": 3.8,
  "cgpa-34": 3.55,
  "cgpa-30": 3.2,
  "cgpa-25": 2.75,
  "cgpa-low": 2.4,
};

const POPULAR_FIRST: Country[] = [
  "USA",
  "UK",
  "Canada",
  "Australia",
  "Germany",
  "Japan",
];

function Progress({ step }: { step: number }) {
  return (
    <div className="flex gap-1.5" aria-hidden>
      {STEPS.map((s, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-pill transition-colors duration-300 ${
            i <= step ? "bg-[#1F9D61]" : "bg-softer"
          } ${i === PROFILE_ORDER.length ? "ml-2" : ""}`}
        />
      ))}
    </div>
  );
}

function StepHeading({
  id,
  question,
  hint,
}: {
  id: string;
  question: string;
  hint: string;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [id]);
  return (
    <>
      <h2
        ref={headingRef}
        tabIndex={-1}
        id={`q-${id}`}
        className="font-display text-[clamp(22px,2.6vw,28px)] font-bold leading-snug tracking-[-0.02em] text-ink outline-none"
      >
        {question}
      </h2>
      <p className="mt-2 font-body text-[15px] text-sub">{hint}</p>
    </>
  );
}

/** Small pill choice used for majors and countries. */
function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-pill border-[1.5px] px-3.5 py-2 font-body text-[14px] transition-colors ${
        selected
          ? "border-[#1F9D61] bg-[#E3F4EA] text-ink"
          : "border-line bg-white text-ink hover:border-[#1F9D61]/40"
      }`}
    >
      {children}
    </button>
  );
}

function ProfileStep({
  field,
  profile,
  now,
  onChange,
}: {
  field: ProfileKey;
  profile: ReadinessProfile;
  now: Date;
  onChange: (value: string) => void;
}) {
  const { question, hint } = PROFILE_QUESTIONS[field];
  const value = profile[field];

  let body: React.ReactNode;
  if (field === "degree") {
    body = (
      <div className="grid gap-2.5 sm:grid-cols-2">
        {DEGREE_OPTIONS.map((d) => {
          const selected = value === d.id;
          return (
            <button
              key={d.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(d.id)}
              className={`rounded-[14px] border-[1.5px] px-4.5 py-4 text-left transition-colors ${
                selected
                  ? "border-[#1F9D61] bg-[#E3F4EA]/70"
                  : "border-line bg-white hover:border-[#1F9D61]/40"
              }`}
            >
              <span className="block font-display text-[21px] leading-tight text-ink">
                {d.label}
              </span>
              <span className="mt-1 block font-body text-[13.5px] text-sub">
                {d.hint}
              </span>
            </button>
          );
        })}
      </div>
    );
  } else if (field === "major") {
    body = (
      <div className="flex flex-wrap gap-2">
        {[...MAJORS].sort().map((m) => (
          <Chip key={m} selected={value === m} onClick={() => onChange(m)}>
            {m}
          </Chip>
        ))}
        <Chip
          selected={value === UNDECIDED}
          onClick={() => onChange(UNDECIDED)}
        >
          Not decided yet
        </Chip>
      </div>
    );
  } else if (field === "country") {
    const rest = COUNTRIES.filter((c) => !POPULAR_FIRST.includes(c));
    body = (
      <div>
        <p className="mb-2 font-body text-[12.5px] text-sub">Most popular</p>
        <div className="flex flex-wrap gap-2">
          {POPULAR_FIRST.map((c) => (
            <Chip key={c} selected={value === c} onClick={() => onChange(c)}>
              <span className="text-[16px] leading-none">
                {COUNTRY_INFO[c].flag}
              </span>{" "}
              {c}
            </Chip>
          ))}
          <Chip
            selected={value === UNDECIDED}
            onClick={() => onChange(UNDECIDED)}
          >
            Not decided yet
          </Chip>
        </div>
        <p className="mb-2 mt-5 font-body text-[12.5px] text-sub">
          More destinations
        </p>
        <div className="flex flex-wrap gap-2">
          {rest.map((c) => (
            <Chip key={c} selected={value === c} onClick={() => onChange(c)}>
              <span className="text-[16px] leading-none">
                {COUNTRY_INFO[c].flag}
              </span>{" "}
              {c}
            </Chip>
          ))}
        </div>
      </div>
    );
  } else {
    body = (
      <div className="grid gap-2.5 sm:grid-cols-2">
        {INTAKE_OPTIONS.map((i) => {
          const selected = value === i.id;
          const months = monthsBetween(now, new Date(i.start));
          return (
            <button
              key={i.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(i.id)}
              className={`flex items-center justify-between gap-3 rounded-[14px] border-[1.5px] px-4.5 py-4 text-left transition-colors ${
                selected
                  ? "border-[#1F9D61] bg-[#E3F4EA]/70"
                  : "border-line bg-white hover:border-[#1F9D61]/40"
              }`}
            >
              <span className="font-display text-[21px] leading-tight text-ink">
                {i.label}
              </span>
              <span
                className={`rounded-pill px-2.5 py-1 font-body text-[12px] ${
                  months <= 9
                    ? "bg-[#FFE8E6] text-[#C2343E]"
                    : months <= 15
                      ? "bg-[#FFF3D6] text-[#9A6A00]"
                      : "bg-soft text-sub"
                }`}
              >
                ~{months} months
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <StepHeading id={field} question={question} hint={hint} />
      <div role="radiogroup" aria-labelledby={`q-${field}`} className="mt-6">
        {body}
      </div>
    </div>
  );
}

function SelectAll({
  all,
  some,
  onToggle,
}: {
  all: boolean;
  some: boolean;
  onToggle: (on: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={all ? true : some ? "mixed" : false}
      onClick={() => onToggle(!all)}
      className="mt-5 inline-flex items-center gap-2.5 rounded-pill bg-soft py-2 pl-2.5 pr-4 font-body text-[14px] font-medium text-ink transition-colors hover:bg-softer"
    >
      <span
        className={`grid h-5 w-5 place-items-center rounded-md border-[1.5px] text-white transition-colors ${
          all || some ? "border-[#1F9D61] bg-[#1F9D61]" : "border-line bg-white"
        }`}
      >
        {all ? (
          <CheckMark />
        ) : some ? (
          <span className="h-0.5 w-2.5 rounded-pill bg-white" />
        ) : null}
      </span>
      {all ? "Clear all" : "Select all"}
    </button>
  );
}

function QuestionStep({
  index,
  answers,
  profile,
  onChange,
}: {
  index: number;
  answers: ReadinessAnswers;
  profile: ReadinessProfile;
  onChange: (ids: string[]) => void;
}) {
  const q = questionFor(READINESS_QUESTIONS[index], profile);
  const picked = answers[q.area] ?? [];

  function toggle(id: string) {
    if (q.kind === "single") {
      onChange([id]);
    } else {
      onChange(
        picked.includes(id) ? picked.filter((p) => p !== id) : [...picked, id],
      );
    }
  }

  const role = q.kind === "single" ? "radio" : "checkbox";

  return (
    <div>
      <StepHeading id={q.area} question={q.question} hint={q.hint} />

      {q.kind === "checklist" && (
        <SelectAll
          all={picked.length === q.options.length}
          some={picked.length > 0}
          onToggle={(on) => onChange(on ? q.options.map((o) => o.id) : [])}
        />
      )}

      <div
        role={q.kind === "single" ? "radiogroup" : "group"}
        aria-labelledby={`q-${q.area}`}
        className={`grid gap-2.5 ${q.kind === "checklist" ? "mt-3" : "mt-6"}`}
      >
        {q.options.map((option) => {
          const selected = picked.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              role={role}
              aria-checked={selected}
              onClick={() => toggle(option.id)}
              className={`flex items-center gap-3.5 rounded-[14px] border-[1.5px] px-4.5 py-3.75 text-left font-body text-[15.5px] font-medium transition-colors duration-150 ${
                selected
                  ? "border-[#1F9D61] bg-[#E3F4EA]/70 text-ink"
                  : "border-line bg-white text-ink hover:border-[#1F9D61]/40"
              }`}
            >
              <span
                className={`grid h-5.5 w-5.5 shrink-0 place-items-center border-[1.5px] text-white transition-colors ${
                  q.kind === "single" ? "rounded-full" : "rounded-md"
                } ${selected ? "border-[#1F9D61] bg-[#1F9D61]" : "border-line bg-white"}`}
              >
                {selected && <CheckMark />}
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ScoreRing({ total, tone }: { total: number; tone: Tone }) {
  const r = 54;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - total / 100);
  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg
        viewBox="0 0 128 128"
        className="h-full w-full -rotate-90"
        aria-hidden
      >
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="#fff"
          stroke={tone.track}
          strokeWidth="10"
        />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke={tone.ring}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-1000 ease-out motion-reduce:transition-none"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-display text-[44px] leading-none tracking-[-0.03em] text-ink">
            {total}
          </div>
          <div className="mt-1 font-body text-[12px] text-sub">out of 100</div>
        </div>
      </div>
    </div>
  );
}

const fmtK = (usd: number) => `$${Math.round(usd / 1000)}k`;
const fmtLakh = (usd: number) =>
  `৳${Math.round((usd * BDT_PER_USD) / 100000)}L`;

/** One line that sums up the plan the student described. */
function PlanStrip({ profile, now }: { profile: ReadinessProfile; now: Date }) {
  const degree = DEGREE_OPTIONS.find((d) => d.id === profile.degree);
  const intake = INTAKE_OPTIONS.find((i) => i.id === profile.intake);
  const country =
    profile.country && profile.country !== UNDECIDED
      ? (profile.country as Country)
      : null;
  const chips = [
    degree && degree.id !== "unsure" ? degree.label : "Degree to decide",
    profile.major && profile.major !== UNDECIDED
      ? profile.major
      : "Field to decide",
    country
      ? `${COUNTRY_INFO[country].flag} ${country}`
      : "Destination to decide",
    intake
      ? `${intake.label} · ~${monthsBetween(now, new Date(intake.start))} months away`
      : null,
  ].filter(Boolean);

  return (
    <div className="mb-5 flex flex-col gap-3 rounded-card bg-white px-5.5 py-4 sm:flex-row sm:items-center">
      <span className="shrink-0 font-body text-[13px] text-sub">Your plan</span>
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <span
            key={c}
            className="rounded-pill bg-soft px-3 py-1.5 font-body text-[13.5px] text-ink"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Visa, costs and intakes for the student's first-choice country. */
function DestinationCard({ country }: { country: Country }) {
  const info = COUNTRY_INFO[country];
  const [lo, hi] = info.livingCost;
  const rows = [
    { label: "Visa", value: info.visa },
    { label: "Intakes", value: info.intakes.join(", ") },
    {
      label: "Living costs / year",
      value: `${fmtK(lo)}–${fmtK(hi)} (${fmtLakh(lo)}–${fmtLakh(hi)})`,
    },
    { label: "Work while studying", value: info.workWhileStudying },
    { label: "After you graduate", value: info.postStudyWork },
    { label: "Scholarships", value: info.scholarships },
    { label: "Bangladeshi community", value: info.bdCommunity },
  ];
  return (
    <div className="rounded-card bg-white p-5.5">
      <div className="flex items-center gap-3">
        <span className="text-[30px] leading-none" aria-hidden>
          {info.flag}
        </span>
        <div>
          <div className="font-body text-[13px] text-sub">Your destination</div>
          <h3 className="font-display text-[24px] leading-tight text-ink">
            {country}
          </h3>
        </div>
      </div>
      <dl className="mt-4 grid gap-0">
        {rows.map((r) => (
          <div
            key={r.label}
            className="grid grid-cols-[130px_1fr] gap-3 border-t border-line py-2.5"
          >
            <dt className="font-body text-[13px] text-sub">{r.label}</dt>
            <dd className="font-body text-[13.5px] leading-snug text-ink">
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 font-body text-[12px] text-sub">
        Typical figures. Check the official visa website before you apply.
      </p>
    </div>
  );
}

function finderHref(profile: ReadinessProfile, answers: ReadinessAnswers) {
  const params = new URLSearchParams();
  if (profile.country && profile.country !== UNDECIDED)
    params.set("country", profile.country);
  if (profile.major && profile.major !== UNDECIDED)
    params.set("major", profile.major);
  const cgpa = CGPA_FOR_FINDER[answers.cgpa?.[0] ?? ""];
  if (cgpa && profile.degree !== "bachelors") params.set("cgpa", String(cgpa));
  const qs = params.toString();
  return qs ? `/universities?${qs}` : "/universities";
}

function Results({
  answers,
  profile,
  now,
  onRestart,
}: {
  answers: ReadinessAnswers;
  profile: ReadinessProfile;
  now: Date;
  onRestart: () => void;
}) {
  const { total, areas, todos, tier } = scoreAnswers(answers, profile, now);
  const country =
    profile.country && profile.country !== UNDECIDED
      ? (profile.country as Country)
      : null;
  const tone = toneFor(total);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    // Start from 0 so the ring and bars animate in.
    const id = requestAnimationFrame(() => setShown(total));
    return () => cancelAnimationFrame(id);
  }, [total]);

  return (
    <>
      <PlanStrip profile={profile} now={now} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid h-fit gap-5">
          <div className="overflow-hidden rounded-card bg-white">
            <div className="p-5.5 pb-6" style={{ background: tone.tint }}>
              <div
                className="font-body text-[13px]"
                style={{ color: tone.deep }}
              >
                Your readiness
              </div>
              <div className="mt-4 flex items-center gap-5">
                <ScoreRing total={shown} tone={tone} />
                <div>
                  <h2
                    ref={headingRef}
                    tabIndex={-1}
                    className="font-display text-[30px] leading-tight tracking-[-0.02em] text-ink outline-none"
                  >
                    {tier.label}
                  </h2>
                  <p className="mt-2 font-body text-[14.5px] leading-relaxed text-ink/70">
                    {tier.summary}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5.5">
              <ul className="grid list-none gap-3.5 p-0">
                {areas.map((a) => {
                  const pct = Math.round((a.points / AREA_MAX) * 100);
                  return (
                    <li key={a.area}>
                      <div className="flex justify-between font-body text-[13.5px]">
                        <span className="text-sub">{a.label}</span>
                        <span className="text-ink">
                          {a.points}/{AREA_MAX}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-pill bg-soft">
                        <div
                          className="h-full rounded-pill transition-[width] duration-700 ease-out motion-reduce:transition-none"
                          style={{
                            width: shown ? `${pct}%` : "0%",
                            background: barColor(pct),
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={finderHref(profile, answers)} variant="dark">
                  Find my universities
                </Button>
                <Button variant="ghost" onClick={onRestart}>
                  Retake quiz
                </Button>
              </div>
            </div>
          </div>
          {country && <DestinationCard country={country} />}
        </div>

        <div className="rounded-card bg-white p-5.5 sm:p-6.5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-[28px] tracking-[-0.02em] text-ink">
              Your to-do list
            </h3>
            <span className="font-body text-[13px] text-sub">
              {todos.length} {todos.length === 1 ? "step" : "steps"}
            </span>
          </div>

          {todos.length === 0 ? (
            <p className="mt-4 font-body text-[15px] leading-relaxed text-sub">
              Nothing left to fix — your profile is in great shape. Start
              shortlisting universities and tracking scholarship deadlines.
            </p>
          ) : (
            <ol className="mt-4.5 grid list-none gap-3 p-0">
              {todos.map((t, i) => (
                <li
                  key={t.title}
                  className="flex gap-3.5 rounded-[18px] border border-line bg-white px-4.5 py-4.5"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-soft font-body text-[12.5px] text-ink">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-[20px] leading-tight text-ink">
                        {t.title}
                      </span>
                      <span
                        className={`rounded-pill border px-2.5 py-0.5 font-body text-[12px] ${PRIORITY_STYLES[t.priority]}`}
                      >
                        {PRIORITY_LABEL[t.priority]}
                      </span>
                    </div>
                    <p className="mt-1.5 font-body text-[14px] leading-relaxed text-sub">
                      <span className="font-medium text-ink">
                        {t.areaLabel}:
                      </span>{" "}
                      {t.detail}
                    </p>
                    {t.link && (
                      <Link
                        href={t.link.href}
                        className="mt-2.5 inline-block font-body text-[14px] text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-ink"
                      >
                        {t.link.label} →
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </>
  );
}

export function ReadinessQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ReadinessAnswers>({});
  const [profile, setProfile] = useState<ReadinessProfile>({});
  const [done, setDone] = useState(false);
  // Fixed once, so month counts don't shift between renders.
  const [now] = useState(() => new Date());

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const canContinue =
    current.type === "profile"
      ? Boolean(profile[current.key])
      : isAnswered(answers, current.index);
  const label =
    current.type === "profile"
      ? "About you"
      : questionFor(READINESS_QUESTIONS[current.index], profile).areaLabel;

  function restart() {
    setAnswers({});
    setProfile({});
    setStep(0);
    setDone(false);
  }

  return (
    <section className="bg-soft px-6 py-16">
      <div className={`mx-auto ${done ? "max-w-6xl" : "max-w-2xl"}`}>
        {done ? (
          <Results
            answers={answers}
            profile={profile}
            now={now}
            onRestart={restart}
          />
        ) : (
          <div className="overflow-hidden rounded-card bg-white">
            <div className="flex items-center justify-between border-b-2 border-dashed border-line px-6 py-4 font-label text-[11.5px] uppercase tracking-[0.1em] text-sub">
              <span>
                Gate {step + 1} of {STEPS.length}
              </span>
              <span className="text-[#13804D]">{label}</span>
            </div>

            <div className="p-6 sm:p-8">
              <Progress step={step} />
              <div className="mt-7">
                {current.type === "profile" ? (
                  <ProfileStep
                    field={current.key}
                    profile={profile}
                    now={now}
                    onChange={(value) =>
                      setProfile((prev) => ({ ...prev, [current.key]: value }))
                    }
                  />
                ) : (
                  <QuestionStep
                    index={current.index}
                    answers={answers}
                    profile={profile}
                    onChange={(ids) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [READINESS_QUESTIONS[current.index].area]: ids,
                      }))
                    }
                  />
                )}
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                {step > 0 ? (
                  <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
                    ← Back
                  </Button>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={() =>
                    isLast ? setDone(true) : setStep((s) => s + 1)
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-button bg-ink px-5.5 py-3 font-body text-[15px] font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                >
                  {isLast ? "See my score" : "Next →"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
