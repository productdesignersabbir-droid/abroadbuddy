"use client";

import { useEffect, useState } from "react";
import type { Coach, CoachSessionType, ExamType } from "@/data/ielts";
import { formatCoachPrice } from "@/lib/ielts-match";
import { FallbackImage } from "@/components/ui/FallbackImage";

export function BookCoachModal({ coach, onClose }: { coach: Coach; onClose: () => void }) {
  const [examType, setExamType] = useState<ExamType>(coach.examTypes[0]);
  const [sessionType, setSessionType] = useState<CoachSessionType>(coach.sessionTypes[0]);
  const [confirmed, setConfirmed] = useState(false);

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
      aria-labelledby="coach-modal-title"
      className="fixed inset-0 z-100 flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-110 overflow-hidden rounded-t-[24px] bg-white shadow-[0_30px_70px_-20px_rgba(11,18,32,0.4)] sm:rounded-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-line p-6">
          <div className="flex items-center gap-3.5">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-line">
              <FallbackImage
                src={coach.photoSrc}
                alt={coach.photoAlt}
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div>
              <h2
                id="coach-modal-title"
                className="font-display text-base font-bold leading-snug text-ink"
              >
                {coach.name}
              </h2>
              <p className="font-body text-[13px] text-sub">{coach.specialty}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sub transition-colors hover:bg-soft"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {confirmed ? (
            <div className="py-4 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12l4 4 10-10"
                    stroke="#1E4FFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-4 font-display text-lg font-bold text-ink">Request sent</p>
              <p className="mx-auto mt-2 max-w-90 font-body text-sm leading-relaxed text-sub">
                {coach.name.split(" ")[0]} will email you within 24 hours to confirm a time for
                your {examType} {sessionType === "1:1" ? "1:1" : "group"} session.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-button bg-blue px-5 py-2.5 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)]"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {coach.examTypes.length > 1 && (
                <>
                  <div className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
                    Exam
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {coach.examTypes.map((exam) => (
                      <button
                        key={exam}
                        type="button"
                        onClick={() => setExamType(exam)}
                        className={`rounded-button border-[1.5px] px-4 py-2.5 font-body text-sm font-semibold transition-colors ${
                          examType === exam
                            ? "border-blue bg-blue/5 text-blue"
                            : "border-line text-ink"
                        }`}
                      >
                        {exam}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div className={coach.examTypes.length > 1 ? "mt-5" : ""}>
                <div className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
                  Session type
                </div>
                <div className="mt-2.5 flex gap-2">
                  {coach.sessionTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSessionType(type)}
                      className={`rounded-button border-[1.5px] px-4 py-2.5 font-body text-sm font-semibold transition-colors ${
                        sessionType === type
                          ? "border-blue bg-blue/5 text-blue"
                          : "border-line text-ink"
                      }`}
                    >
                      {type === "1:1" ? "1:1 session" : "Group session"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl border border-line bg-soft px-4 py-3.5">
                <span className="font-body text-sm font-medium text-ink">Price</span>
                <span className="font-display text-base font-bold text-ink">
                  {formatCoachPrice(coach.price)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setConfirmed(true)}
                className="mt-5 w-full rounded-button bg-blue px-5 py-3 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
              >
                Confirm request
              </button>
              <p className="mt-3 text-center font-body text-[12.5px] text-sub">
                No payment required yet — you&apos;ll coordinate details by email.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
