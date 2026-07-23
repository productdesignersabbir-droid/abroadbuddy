"use client";

import { useEffect, useState } from "react";
import { COUNTRIES, VISA_OUTCOMES } from "@/data/visa-stories";

const fieldLabel = "font-label text-[11px] uppercase tracking-[0.08em] text-sub";
const inputClass =
  "mt-2 w-full rounded-button border-[1.5px] border-line bg-white px-3.5 py-2.5 font-body text-sm font-medium text-ink transition-colors focus-visible:border-blue";

export function ShareVisaStoryModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

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
      aria-labelledby="share-visa-modal-title"
      className="fixed inset-0 z-100 flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-120 overflow-hidden rounded-t-[24px] bg-white shadow-[0_30px_70px_-20px_rgba(11,18,32,0.4)] sm:rounded-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-line p-6">
          <h2
            id="share-visa-modal-title"
            className="font-display text-lg font-bold leading-snug text-ink"
          >
            Share your visa story
          </h2>
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
          {submitted ? (
            <div className="py-4 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 8v5M12 16.5h.01M12 3l9 16H3l9-16z"
                    stroke="#1E4FFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-4 font-display text-lg font-bold text-ink">
                Submitted for review
              </p>
              <p className="mx-auto mt-2 max-w-90 font-body text-sm leading-relaxed text-sub">
                Our admin team checks every visa story for accuracy before it
                goes live. Yours will appear here once approved — usually
                within a couple of days.
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label htmlFor="visaStoryTitle" className={fieldLabel}>
                  Title
                </label>
                <input
                  id="visaStoryTitle"
                  type="text"
                  required
                  placeholder="e.g. My F-1 interview lasted 90 seconds"
                  className={inputClass}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="visaDestination" className={fieldLabel}>
                    Destination
                  </label>
                  <select id="visaDestination" required className={inputClass}>
                    <option value="">Select country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="visaOutcomeInput" className={fieldLabel}>
                    Outcome
                  </label>
                  <select id="visaOutcomeInput" required className={inputClass}>
                    <option value="">Select outcome</option>
                    {VISA_OUTCOMES.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="visaStoryBody" className={fieldLabel}>
                  Your story
                </label>
                <textarea
                  id="visaStoryBody"
                  required
                  rows={5}
                  placeholder="Share what documents you prepared, what you were asked, and what you'd tell someone applying after you..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="mt-5 w-full rounded-button bg-blue px-5 py-3 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
              >
                Submit for admin review
              </button>
              <p className="mt-3 text-center font-body text-[12.5px] text-sub">
                An admin reviews every submission before it&apos;s published —
                no story goes live automatically.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
