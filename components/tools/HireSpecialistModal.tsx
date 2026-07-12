"use client";

import { useEffect, useState } from "react";
import type { Specialist } from "@/data/specialists";
import { FallbackImage } from "@/components/ui/FallbackImage";

export function HireSpecialistModal({
  specialist,
  onClose,
}: {
  specialist: Specialist;
  onClose: () => void;
}) {
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
      aria-labelledby="hire-modal-title"
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
                src={specialist.photoSrc}
                alt={specialist.photoAlt}
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div>
              <h2
                id="hire-modal-title"
                className="font-display text-base font-bold leading-snug text-ink"
              >
                {specialist.name}
              </h2>
              <p className="font-body text-[13px] text-sub">{specialist.specialty}</p>
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
                {specialist.name.split(" ")[0]} will email you within 24 hours to kick off
                your document.
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
              <div className="flex items-center justify-between rounded-xl border border-line bg-soft px-4 py-3.5">
                <span className="font-body text-sm font-medium text-ink">
                  Price per document
                </span>
                <span className="font-display text-base font-bold text-ink">
                  ${specialist.price}
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
