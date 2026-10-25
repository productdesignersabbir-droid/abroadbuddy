"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AREA_MAX, READINESS_QUESTIONS, type Priority } from "@/data/readiness";
import {
  isAnswered,
  scoreAnswers,
  type ReadinessAnswers,
} from "@/lib/readiness-score";
import { Button } from "@/components/ui/Button";

const PRIORITY_STYLES: Record<Priority, string> = {
  high: "bg-red/10 text-red border-red/20",
  medium: "bg-blue/10 text-blue border-blue/20",
  low: "bg-soft text-sub border-line",
};

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

function Progress({ step }: { step: number }) {
  return (
    <div className="flex gap-1.5" aria-hidden>
      {READINESS_QUESTIONS.map((q, i) => (
        <div
          key={q.area}
          className={`h-1.5 flex-1 rounded-pill transition-colors duration-300 ${
            i <= step ? "bg-blue" : "bg-softer"
          }`}
        />
      ))}
    </div>
  );
}

function QuestionStep({
  step,
  answers,
  onChange,
}: {
  step: number;
  answers: ReadinessAnswers;
  onChange: (ids: string[]) => void;
}) {
  const q = READINESS_QUESTIONS[step];
  const picked = answers[q.area] ?? [];
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  function toggle(id: string) {
    if (q.kind === "single") {
      onChange([id]);
    } else {
      onChange(picked.includes(id) ? picked.filter((p) => p !== id) : [...picked, id]);
    }
  }

  const role = q.kind === "single" ? "radio" : "checkbox";

  return (
    <div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        id={`q-${q.area}`}
        className="font-display text-[clamp(22px,2.6vw,28px)] font-bold leading-snug tracking-[-0.02em] text-ink outline-none"
      >
        {q.question}
      </h2>
      <p className="mt-2 font-body text-[15px] text-sub">{q.hint}</p>

      <div
        role={q.kind === "single" ? "radiogroup" : "group"}
        aria-labelledby={`q-${q.area}`}
        className="mt-6 grid gap-2.5"
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
                  ? "border-blue bg-blue/6 text-ink"
                  : "border-line bg-white text-ink hover:border-blue/40"
              }`}
            >
              <span
                className={`grid h-5.5 w-5.5 shrink-0 place-items-center border-[1.5px] text-white transition-colors ${
                  q.kind === "single" ? "rounded-full" : "rounded-md"
                } ${selected ? "border-blue bg-blue" : "border-[#C3CCDE] bg-white"}`}
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

function ScoreRing({ total }: { total: number }) {
  const r = 54;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - total / 100);
  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="64" cy="64" r={r} fill="none" stroke="#EEF2FB" strokeWidth="11" />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke="url(#ring)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-1000 ease-out motion-reduce:transition-none"
        />
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E4FFF" />
            <stop offset="100%" stopColor="#0B2FE8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-display text-[40px] font-bold leading-none tracking-[-0.03em] text-ink">
            {total}
          </div>
          <div className="mt-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-sub">
            out of 100
          </div>
        </div>
      </div>
    </div>
  );
}

function Results({
  answers,
  onRestart,
}: {
  answers: ReadinessAnswers;
  onRestart: () => void;
}) {
  const { total, areas, todos, tier } = scoreAnswers(answers);
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
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="h-fit overflow-hidden rounded-card bg-white">
        <div className="flex items-center justify-between bg-linear-to-br from-blue to-blue-deep px-5.5 py-3.5 font-label text-[11.5px] uppercase tracking-[0.1em] text-white/85">
          <span>Readiness pass</span>
          <span>EasiAbroad</span>
        </div>
        <div className="p-5.5">
          <div className="flex items-center gap-5">
            <ScoreRing total={shown} />
            <div>
              <div className="font-label text-[11px] uppercase tracking-[0.1em] text-sub">
                Your status
              </div>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="mt-1 font-display text-[26px] font-bold leading-tight tracking-[-0.02em] text-ink outline-none"
              >
                {tier.label}
              </h2>
              <p className="mt-2 font-body text-[14.5px] leading-relaxed text-sub">
                {tier.summary}
              </p>
            </div>
          </div>

          <div className="my-5.5 border-t-2 border-dashed border-line" />

          <ul className="grid list-none gap-3.5 p-0">
            {areas.map((a) => {
              const pct = Math.round((a.points / AREA_MAX) * 100);
              return (
                <li key={a.area}>
                  <div className="flex justify-between font-body text-[13.5px]">
                    <span className="text-sub">{a.label}</span>
                    <span className="font-semibold text-ink">
                      {a.points}/{AREA_MAX}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-pill bg-softer">
                    <div
                      className={`h-full rounded-pill transition-[width] duration-700 ease-out motion-reduce:transition-none ${
                        pct < 50 ? "bg-red" : "bg-blue"
                      }`}
                      style={{ width: shown ? `${pct}%` : "0%" }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/universities" variant="primary">
              Find my universities
            </Button>
            <Button variant="ghost" onClick={onRestart}>
              Retake quiz
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-card bg-white p-5.5 sm:p-6.5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-[22px] font-bold tracking-[-0.02em] text-ink">
            Your to-do list
          </h3>
          <span className="font-label text-[11.5px] uppercase tracking-[0.08em] text-sub">
            {todos.length} {todos.length === 1 ? "step" : "steps"}
          </span>
        </div>

        {todos.length === 0 ? (
          <p className="mt-4 font-body text-[15px] leading-relaxed text-sub">
            Nothing left to fix — your profile is in great shape. Start shortlisting
            universities and tracking scholarship deadlines.
          </p>
        ) : (
          <ol className="mt-4.5 grid list-none gap-3 p-0">
            {todos.map((t, i) => (
              <li
                key={t.title}
                className="flex gap-3.5 rounded-[14px] border border-line bg-soft px-4 py-4"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white font-label text-xs font-bold text-ink shadow-[0_1px_3px_rgba(11,18,32,0.08)]">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-[16.5px] font-semibold text-ink">
                      {t.title}
                    </span>
                    <span
                      className={`rounded-pill border px-2 py-0.5 font-label text-[10.5px] uppercase tracking-[0.06em] ${PRIORITY_STYLES[t.priority]}`}
                    >
                      {PRIORITY_LABEL[t.priority]}
                    </span>
                  </div>
                  <p className="mt-1.5 font-body text-[14px] leading-relaxed text-sub">
                    <span className="font-medium text-ink">{t.areaLabel}:</span> {t.detail}
                  </p>
                  {t.link && (
                    <Link
                      href={t.link.href}
                      className="mt-2 inline-block font-body text-[13.5px] font-semibold text-blue hover:underline"
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
  );
}

export function ReadinessQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ReadinessAnswers>({});
  const [done, setDone] = useState(false);

  const q = READINESS_QUESTIONS[step];
  const isLast = step === READINESS_QUESTIONS.length - 1;
  const canContinue = isAnswered(answers, step);

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  return (
    <section className="bg-soft px-6 py-16">
      <div className={`mx-auto ${done ? "max-w-6xl" : "max-w-2xl"}`}>
        {done ? (
          <Results answers={answers} onRestart={restart} />
        ) : (
          <div className="overflow-hidden rounded-card bg-white">
            <div className="flex items-center justify-between border-b-2 border-dashed border-line px-6 py-4 font-label text-[11.5px] uppercase tracking-[0.1em] text-sub">
              <span>
                Gate {step + 1} of {READINESS_QUESTIONS.length}
              </span>
              <span className="text-blue">{q.areaLabel}</span>
            </div>

            <div className="p-6 sm:p-8">
              <Progress step={step} />
              <div className="mt-7">
                <QuestionStep
                  step={step}
                  answers={answers}
                  onChange={(ids) => setAnswers((prev) => ({ ...prev, [q.area]: ids }))}
                />
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
                  onClick={() => (isLast ? setDone(true) : setStep((s) => s + 1))}
                  className="inline-flex items-center justify-center gap-2 rounded-button bg-blue px-5.5 py-3 font-body text-[15px] font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
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
