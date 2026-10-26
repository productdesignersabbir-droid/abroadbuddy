"use client";

import Link from "next/link";
import { useState } from "react";
import { MAJORS, type Major } from "@/data/universities";
import {
  ACCESS,
  STAGES,
  directionsFor,
  focusOf,
  paperSearches,
  topicsFor,
  type Access,
  type Stage,
} from "@/data/research-direction";
import { Chip, Field, inputClass } from "@/components/ui/Chip";

const NEXT_STEPS = [
  { href: "/lab-kemon", label: "Find a professor in this area" },
  { href: "/mentoring?type=research", label: "Talk to a research mentor" },
  { href: "/application-studio?doc=proposal", label: "Start your proposal" },
];

export function ResearchDirectionFinder() {
  const [major, setMajor] = useState<Major | "">("");
  const [topic, setTopic] = useState<string>();
  const [stage, setStage] = useState<Stage>();
  const [access, setAccess] = useState<Access>();
  const [interest, setInterest] = useState("");

  const ready = Boolean(major && stage && access);
  const focus = major ? focusOf(major, topic, interest) : "";
  const directions = ready ? directionsFor(focus, access!) : [];
  const scope = STAGES.find((s) => s.id === stage)?.scope;

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-7 bg-white p-6 sm:p-7">
          <Field step={1} label="Your subject">
            <select
              value={major}
              onChange={(e) => {
                setMajor(e.target.value as Major);
                setTopic(undefined);
              }}
              className={inputClass}
            >
              <option value="">Choose a subject</option>
              {[...MAJORS].sort().map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </Field>

          {major && (
            <Field step={2} label="Which part interests you?" hint="Optional. Skip it if you're not sure yet.">
              <div className="flex flex-wrap gap-2">
                {topicsFor(major).map((t) => (
                  <Chip key={t} selected={topic === t} onClick={() => setTopic(topic === t ? undefined : t)}>
                    {t}
                  </Chip>
                ))}
              </div>
              <input
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="Or in your words, e.g. flood warnings for farmers"
                className={`${inputClass} mt-3`}
              />
            </Field>
          )}

          <Field step={major ? 3 : 2} label="What is it for?">
            <div className="flex flex-wrap gap-2">
              {STAGES.map((s) => (
                <Chip key={s.id} selected={stage === s.id} onClick={() => setStage(s.id)}>
                  {s.label}
                </Chip>
              ))}
            </div>
          </Field>

          <Field step={major ? 4 : 3} label="What can you work with?">
            <div className="flex flex-wrap gap-2">
              {ACCESS.map((a) => (
                <Chip key={a.id} selected={access === a.id} onClick={() => setAccess(a.id)}>
                  {a.label}
                </Chip>
              ))}
            </div>
          </Field>
        </div>

        <div className="flex flex-col gap-4">
          {!ready ? (
            <div className="flex h-full min-h-80 flex-col justify-center border border-dashed border-line bg-white p-8">
              <p className="font-label text-[11px] uppercase tracking-[0.08em] text-blue">Question before title</p>
              <p className="mt-2 font-display text-[28px] leading-tight text-ink">
                Start small. A clear question beats a big title.
              </p>
              <p className="mt-3 max-w-md font-body text-[15px] leading-relaxed text-sub">
                Answer the questions on the left and we&apos;ll suggest three directions you can start this
                month, using what you actually have access to.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-[28px] leading-tight text-ink">Three directions to explore</h2>
                <p className="font-body text-[13px] text-sub">{scope}</p>
              </div>
              {directions.map((d, i) => (
                <article key={d.title} className="bg-white p-5.5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-label text-[12px] text-blue">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-[21px] leading-snug text-ink">{d.title}</h3>
                  </div>
                  <p className="mt-2 font-body text-[15.5px] leading-relaxed text-ink">{d.question}</p>
                  <dl className="mt-4 grid gap-3 border-t border-line pt-3 sm:grid-cols-[150px_1fr]">
                    <dt className="font-body text-[13px] text-sub">Method</dt>
                    <dd className="font-body text-[14px] text-ink">{d.method}</dd>
                    <dt className="font-body text-[13px] text-sub">First step</dt>
                    <dd className="font-body text-[14px] text-ink">{d.firstStep}</dd>
                  </dl>
                </article>
              ))}

              <div className="bg-white p-5.5">
                <p className="font-body text-[14px] text-ink">
                  Search what&apos;s already published on <strong>{focus}</strong>:
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {paperSearches(focus).map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="border-[1.5px] border-line px-4 py-2 font-body text-[14px] font-semibold text-ink hover:border-ink/40"
                    >
                      {s.label} ↗
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-ink p-5.5 text-white">
                <p className="font-display text-[21px]">Your next step</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {NEXT_STEPS.map((s, i) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className={`px-4 py-2.5 font-body text-[14px] font-semibold ${
                        i === 0 ? "bg-blue text-white" : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>

              <p className="font-body text-[12.5px] leading-relaxed text-sub">
                These are starting points, not tested research titles. Check the literature before you claim a
                gap, and don&apos;t collect data from people or run experiments without a supervisor and the
                right approval.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
