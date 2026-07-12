"use client";

import { useEffect, useState } from "react";
import { COUNTRIES, MAJORS } from "@/data/stories";

const fieldLabel = "font-label text-[11px] uppercase tracking-[0.08em] text-sub";
const inputClass =
  "mt-2 w-full rounded-button border-[1.5px] border-line bg-white px-3.5 py-2.5 font-body text-sm font-medium text-ink transition-colors focus-visible:border-blue";

export function ShareStoryModal({ onClose }: { onClose: () => void }) {
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
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-100 flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-120 overflow-hidden rounded-t-[24px] bg-white shadow-[0_30px_70px_-20px_rgba(11,18,32,0.4)] sm:rounded-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-line p-6">
          <h2
            id="share-modal-title"
            className="font-display text-lg font-bold leading-snug text-ink"
          >
            Share your story
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
                    d="M5 12l4 4 10-10"
                    stroke="#1E4FFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-4 font-display text-lg font-bold text-ink">
                Thanks for sharing
              </p>
              <p className="mx-auto mt-2 max-w-90 font-body text-sm leading-relaxed text-sub">
                Story submissions open soon — we&apos;ll email you once your
                journey is ready to publish.
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
                <label htmlFor="storyTitle" className={fieldLabel}>
                  Title
                </label>
                <input
                  id="storyTitle"
                  type="text"
                  required
                  placeholder="e.g. How I landed a funded PhD offer"
                  className={inputClass}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="storyDestination" className={fieldLabel}>
                    Destination
                  </label>
                  <select id="storyDestination" required className={inputClass}>
                    <option value="">Select country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="storyFieldInput" className={fieldLabel}>
                    Field
                  </label>
                  <select id="storyFieldInput" required className={inputClass}>
                    <option value="">Select field</option>
                    {MAJORS.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="storyBody" className={fieldLabel}>
                  Your story
                </label>
                <textarea
                  id="storyBody"
                  required
                  rows={5}
                  placeholder="Share what happened, what surprised you, and what you'd tell someone starting where you did..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="mt-5 w-full rounded-button bg-blue px-5 py-3 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
              >
                Submit story
              </button>
              <p className="mt-3 text-center font-body text-[12.5px] text-sub">
                We review every story before it goes live — no drafts are
                published automatically.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
