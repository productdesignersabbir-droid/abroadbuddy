"use client";

import { useEffect, useState } from "react";
import type { Lab } from "@/data/labs";
import { SUBSCORE_LABELS, formatReviewDate, getOverallRating } from "@/lib/lab-match";
import { FallbackImage } from "@/components/ui/FallbackImage";
import { ScoreBar } from "@/components/lab-kemon/ScoreBar";

export function LabDetailsModal({
  lab,
  onClose,
}: {
  lab: Lab;
  onClose: () => void;
}) {
  const [showWriteNote, setShowWriteNote] = useState(false);
  const overall = getOverallRating(lab);

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
        className="max-h-[92vh] w-full max-w-160 overflow-y-auto rounded-t-[24px] bg-white shadow-[0_30px_70px_-20px_rgba(11,18,32,0.4)] sm:rounded-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-44 w-full sm:h-56">
          <FallbackImage
            src={lab.imageSrc}
            alt={lab.imageAlt}
            className="object-cover"
            sizes="(min-width: 640px) 640px, 100vw"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-ink shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="#0B1220"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-pill bg-white/95 px-3 py-1.25 shadow-sm">
            <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden>
              <path
                d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 16.9l-6.2 3.4 1.6-6.8L2.2 8.9l6.9-.6z"
                fill="#1E4FFF"
              />
            </svg>
            <span className="font-label text-[11px] font-bold tracking-[0.04em] text-blue">
              {overall.toFixed(1)} OVERALL
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-7.5">
          <div className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
            {lab.department} · {lab.university}
          </div>
          <h2
            id="lab-modal-title"
            className="mt-1 font-display text-2xl font-bold leading-snug text-ink"
          >
            {lab.professor}
          </h2>

          <p className="mt-3.5 font-body text-[15px] leading-relaxed text-sub">
            {lab.description}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SUBSCORE_LABELS.map(({ key, label }) => (
              <ScoreBar key={key} label={label} value={lab.subScores[key]} size="lg" />
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-line bg-soft px-4.5 py-4">
            <div className="font-label text-[10px] uppercase tracking-[0.08em] text-sub">
              Funding &amp; stipend
            </div>
            <div className="mt-1.5 font-body text-sm font-medium leading-relaxed text-ink">
              {lab.fundingInfo}
            </div>
          </div>

          <div className="mt-7">
            <div className="flex items-center justify-between">
              <div className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
                Student reviews
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowWriteNote((v) => !v)}
                  className="rounded-[12px] border-[1.5px] border-line px-3.5 py-1.75 font-body text-[12.5px] font-semibold text-ink transition-colors hover:border-blue/50"
                >
                  Write a review
                </button>
                {showWriteNote && (
                  <div className="absolute right-0 top-[calc(100%+8px)] w-56 rounded-xl border border-line bg-white p-3 text-right shadow-[0_18px_40px_-18px_rgba(11,18,32,0.3)]">
                    <p className="font-body text-[12.5px] leading-relaxed text-sub">
                      Review submissions open soon — check back after launch.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3.5 flex flex-col gap-3.5">
              {lab.reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl border border-line bg-white p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-label text-[11px] font-semibold uppercase tracking-[0.04em] text-blue">
                      {review.role}
                    </span>
                    <span className="font-label text-[11px] text-sub">
                      {formatReviewDate(review.date)}
                    </span>
                  </div>
                  <p className="mt-2 font-body text-[13.5px] leading-relaxed text-ink">
                    {review.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
