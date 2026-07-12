"use client";

import { useEffect } from "react";
import type { University } from "@/data/universities";
import { DIFFICULTY_STYLES, formatTuition } from "@/lib/university-match";
import { FallbackImage } from "@/components/ui/FallbackImage";
import { CheckIcon } from "@/components/home/icons";

export function UniversityDetailsModal({
  uni,
  match,
  onClose,
}: {
  uni: University;
  match: number;
  onClose: () => void;
}) {
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
      aria-labelledby="university-modal-title"
      className="fixed inset-0 z-100 flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-160 overflow-y-auto rounded-t-[24px] bg-white shadow-[0_30px_70px_-20px_rgba(11,18,32,0.4)] sm:rounded-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52 w-full sm:h-64">
          <FallbackImage
            src={uni.imageSrc}
            alt={uni.imageAlt}
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
          <div className="absolute left-4 top-4 rounded-pill bg-white/95 px-3 py-1.25 shadow-sm">
            <span className="font-label text-[11px] font-bold tracking-[0.04em] text-blue">
              {match}% MATCH
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-7.5">
          <div className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
            {uni.city}
          </div>
          <h2
            id="university-modal-title"
            className="mt-1 font-display text-2xl font-bold leading-snug text-ink"
          >
            {uni.name}
          </h2>

          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <span className="rounded-pill border border-line bg-soft px-2.75 py-1.25 font-label text-[10.5px] font-semibold tracking-[0.04em] text-ink">
              {uni.country}
            </span>
            <span className="rounded-pill border border-line bg-soft px-2.75 py-1.25 font-label text-[10.5px] font-semibold tracking-[0.04em] text-ink">
              QS #{uni.qsRank}
            </span>
            <span className="rounded-pill border border-line bg-soft px-2.75 py-1.25 font-label text-[10.5px] font-semibold tracking-[0.04em] text-ink">
              THE #{uni.theRank}
            </span>
            <span
              className={`rounded-pill border px-2.75 py-1.25 font-label text-[10.5px] font-semibold tracking-[0.04em] ${DIFFICULTY_STYLES[uni.difficulty]}`}
            >
              {uni.difficulty}
            </span>
          </div>

          <p className="mt-5 font-body text-[15px] leading-relaxed text-sub">
            {uni.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-line bg-soft px-3.5 py-3">
              <div className="font-label text-[10px] uppercase tracking-[0.08em] text-sub">
                Tuition
              </div>
              <div className="mt-1 font-display text-sm font-bold text-ink">
                {formatTuition(uni.tuitionMin, uni.tuitionMax)}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-soft px-3.5 py-3">
              <div className="font-label text-[10px] uppercase tracking-[0.08em] text-sub">
                Min. CGPA
              </div>
              <div className="mt-1 font-display text-sm font-bold text-ink">
                {uni.minCgpa.toFixed(2)}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-soft px-3.5 py-3">
              <div className="font-label text-[10px] uppercase tracking-[0.08em] text-sub">
                QS rank
              </div>
              <div className="mt-1 font-display text-sm font-bold text-ink">
                #{uni.qsRank}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-soft px-3.5 py-3">
              <div className="font-label text-[10px] uppercase tracking-[0.08em] text-sub">
                THE rank
              </div>
              <div className="mt-1 font-display text-sm font-bold text-ink">
                #{uni.theRank}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
              Majors offered
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {uni.majors.map((m) => (
                <span
                  key={m}
                  className="rounded-pill border border-line bg-white px-3 py-1.25 font-body text-[13px] font-medium text-ink"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
              Why students pick it
            </div>
            <ul className="mt-3 grid list-none gap-2.5 p-0">
              {uni.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2.75 font-body text-[14.5px] leading-relaxed text-ink"
                >
                  <span className="mt-0.5">
                    <CheckIcon />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
