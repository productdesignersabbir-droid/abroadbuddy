"use client";

import { useEffect, useState } from "react";
import { COUNTRY_INFO } from "@/data/universities";
import type { Lab } from "@/data/labs";
import {
  ACCEPTING_STYLES,
  SUBSCORE_LABELS,
  formatReviewDate,
  getOverallRating,
} from "@/lib/lab-match";
import { ScoreBar } from "@/components/lab-kemon/ScoreBar";
import { Avatar, StarRating } from "@/components/lab-kemon/LabCard";

const kicker = "font-label text-[11px] uppercase tracking-[0.08em] text-sub";

function Fact({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-[14px] bg-white px-3.5 py-3">
      <div className="font-body text-[12px] text-sub">{label}</div>
      <div className="mt-0.5 font-body text-[15px] font-semibold text-ink">{value}</div>
    </div>
  );
}

export function LabDetailsModal({
  lab,
  onClose,
}: {
  lab: Lab;
  onClose: () => void;
}) {
  const [showWriteNote, setShowWriteNote] = useState(false);
  const overall = getOverallRating(lab);
  const status = ACCEPTING_STYLES[lab.accepting];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lab-modal-title"
      className="fixed inset-0 z-100 flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-[28px] bg-white shadow-[0_30px_70px_-20px_rgba(11,18,32,0.4)] sm:rounded-[28px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-paper px-6 pb-6 pt-7 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Avatar lab={lab} size={76} />
            <div className="min-w-0">
              <h2
                id="lab-modal-title"
                className="font-display text-[clamp(28px,4vw,38px)] leading-[1.05] tracking-[-0.02em] text-ink"
              >
                {lab.professor}
              </h2>
              <p className="mt-1 font-body text-[14px] text-sub">
                {lab.title} · {lab.labName} · {lab.department}
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 font-body text-[14.5px] font-medium text-ink">
                <span aria-hidden>{COUNTRY_INFO[lab.country].flag}</span>
                {lab.university}, {lab.country}
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <StarRating value={overall} />
            <span className={`inline-flex items-center gap-2 rounded-pill bg-white px-3 py-1 font-body text-[13px] ${status.text}`}>
              <span className={`h-2 w-2 rounded-full ${status.dot}`} aria-hidden />
              <span className="font-semibold">{status.label}</span>
              <span className="text-sub">· {lab.acceptingNote}</span>
            </span>
          </div>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_300px]">
          {/* Main column */}
          <div className="grid content-start gap-8">
            <section>
              <div className={kicker}>About the lab</div>
              <p className="mt-2.5 font-body text-[15.5px] leading-relaxed text-ink">{lab.description}</p>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {lab.researchAreas.map((a) => (
                  <span key={a} className="rounded-pill bg-soft px-3 py-1.5 font-body text-[13px] text-ink">
                    {a}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <div className={kicker}>Lab ratings</div>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {SUBSCORE_LABELS.map(({ key, label }) => (
                  <ScoreBar key={key} label={label} value={lab.subScores[key]} />
                ))}
              </div>
            </section>

            <section>
              <div className={kicker}>Recent publications</div>
              <ul className="mt-3 grid list-none gap-2.5 p-0">
                {lab.publications.map((p) => (
                  <li key={p.title} className="rounded-[14px] border border-line px-4 py-3">
                    <div className="font-body text-[14.5px] font-medium leading-snug text-ink">{p.title}</div>
                    <div className="mt-1 font-body text-[12.5px] text-sub">
                      {p.venue} · {p.year}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="flex items-center justify-between">
                <div className={kicker}>Student reviews ({lab.reviews.length})</div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowWriteNote((v) => !v)}
                    className="rounded-button border-[1.5px] border-line px-3.5 py-1.75 font-body text-[12.5px] font-semibold text-ink transition-colors hover:border-ink/40"
                  >
                    Write a review
                  </button>
                  {showWriteNote && (
                    <div className="absolute right-0 top-[calc(100%+8px)] z-10 w-56 rounded-xl border border-line bg-white p-3 text-right shadow-[0_18px_40px_-18px_rgba(11,18,32,0.3)]">
                      <p className="font-body text-[12.5px] leading-relaxed text-sub">
                        Review submissions open soon — check back after launch.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3.5 flex flex-col gap-3">
                {lab.reviews.map((review) => (
                  <div key={review.id} className="rounded-[16px] bg-paper p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-body text-[13px] font-semibold text-ink">{review.role}</span>
                      <span className="font-body text-[12px] text-sub">{formatReviewDate(review.date)}</span>
                    </div>
                    <p className="mt-1.5 font-body text-[14px] leading-relaxed text-ink">“{review.body}”</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="grid content-start gap-5">
            <div className="rounded-[20px] bg-soft p-4">
              <div className={kicker}>Lab at a glance</div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Fact label="Lab size" value={`${lab.labSize} people`} />
                <Fact label="h-index" value={lab.hIndex} />
                <Fact label="Bangladeshi alumni" value={lab.bdAlumni} />
                <Fact label="Field" value={lab.field} />
              </div>
              <div className="mt-3 font-body text-[12px] text-sub">Open positions</div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {lab.positions.map((p) => (
                  <span key={p} className="rounded-pill bg-white px-2.75 py-1 font-body text-[12.5px] font-medium text-ink">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] border border-line p-4">
              <div className={kicker}>Funding & stipend</div>
              <p className="mt-2 font-body text-[14px] font-medium leading-relaxed text-ink">{lab.fundingInfo}</p>
            </div>

            <div className="rounded-[20px] border border-line p-4">
              <div className={kicker}>What they look for</div>
              <ul className="mt-2.5 grid list-none gap-2 p-0">
                {lab.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 font-body text-[13.5px] leading-snug text-ink">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/50" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[20px] bg-[#fff6dc] p-4">
              <div className={kicker}>How to reach out</div>
              <p className="mt-2 font-body text-[13.5px] leading-relaxed text-ink">{lab.contactTip}</p>
            </div>
          </aside>
        </div>

        <p className="border-t border-line bg-paper px-6 py-4 font-body text-[12.5px] text-sub sm:px-8">
          Sample profile for the demo — names, scores and reviews are placeholders until verified data is connected.
        </p>
      </div>
    </div>
  );
}
