"use client";

import { useEffect } from "react";
import type { MockTestSection } from "@/data/ielts";
import { SAMPLE_READING_PASSAGE } from "@/data/ielts";
import { ReadingTest } from "@/components/ielts/ReadingTest";

export function TestModal({
  section,
  onClose,
}: {
  section: MockTestSection;
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
      aria-labelledby="test-modal-title"
      className="fixed inset-0 z-100 flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-160 overflow-y-auto rounded-t-[24px] bg-white shadow-[0_30px_70px_-20px_rgba(11,18,32,0.4)] sm:rounded-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-line bg-white p-6">
          <div>
            <h2 id="test-modal-title" className="font-display text-lg font-bold text-ink">
              {section.title} test
            </h2>
            <p className="mt-0.5 font-body text-[13px] text-sub">
              {section.durationMinutes} min &middot; {section.questionCount} questions
            </p>
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
          {section.id === "reading" ? (
            <ReadingTest passage={SAMPLE_READING_PASSAGE} />
          ) : (
            <div className="py-6 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 7v5l3.5 2M12 21a9 9 0 100-18 9 9 0 000 18z"
                    stroke="#1E4FFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-4 font-display text-lg font-bold text-ink">
                {section.title} demo coming soon
              </p>
              <p className="mx-auto mt-2 max-w-90 font-body text-sm leading-relaxed text-sub">
                We&apos;re building an interactive {section.title.toLowerCase()} test. For now,
                try the free Reading demo to see how scoring works.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-button bg-blue px-5 py-2.5 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)]"
              >
                Got it
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
