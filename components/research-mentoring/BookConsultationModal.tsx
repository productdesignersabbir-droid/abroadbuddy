"use client";

import { useEffect, useMemo, useState } from "react";
import type { ResearchMentor } from "@/data/research-mentors";
import { formatPrice, generateAvailableSlots } from "@/lib/research-mentor-match";
import { FallbackImage } from "@/components/ui/FallbackImage";

export function BookConsultationModal({
  mentor,
  onClose,
}: {
  mentor: ResearchMentor;
  onClose: () => void;
}) {
  const slots = useMemo(() => generateAvailableSlots(), []);
  const [selectedSlotId, setSelectedSlotId] = useState(slots[0]?.id ?? "");
  const [confirmed, setConfirmed] = useState(false);

  const selectedSlot = slots.find((s) => s.id === selectedSlotId);

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
      aria-labelledby="research-booking-modal-title"
      className="fixed inset-0 z-100 flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-115 overflow-hidden rounded-t-[24px] bg-white shadow-[0_30px_70px_-20px_rgba(11,18,32,0.4)] sm:rounded-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-line p-6">
          <div className="flex items-center gap-3.5">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-line">
              <FallbackImage
                src={mentor.photoSrc}
                alt={mentor.photoAlt}
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div>
              <h2
                id="research-booking-modal-title"
                className="font-display text-base font-bold leading-snug text-ink"
              >
                {mentor.name}
              </h2>
              <p className="font-body text-[13px] text-sub">{mentor.title}</p>
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
              <p className="mt-4 font-display text-lg font-bold text-ink">
                Consultation booked
              </p>
              <p className="mx-auto mt-2 max-w-90 font-body text-sm leading-relaxed text-sub">
                {selectedSlot && (
                  <>
                    You&apos;re set for <strong>{selectedSlot.dateLabel}</strong> at{" "}
                    <strong>{selectedSlot.timeLabel}</strong> with {mentor.name.split(" ")[0]}.{" "}
                  </>
                )}
                This is a demo booking flow — no real payment was charged, and no calendar
                invite was actually sent.
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
              <div className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
                Pick a time
              </div>
              <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {slots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`rounded-button border-[1.5px] px-3 py-2.5 text-center font-body text-[13px] font-semibold transition-colors ${
                      selectedSlotId === slot.id
                        ? "border-blue bg-blue/5 text-blue"
                        : "border-line text-ink"
                    }`}
                  >
                    <span className="block">{slot.dateLabel}</span>
                    <span className="block font-body text-[12px] font-medium text-sub">
                      {slot.timeLabel}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl border border-line bg-soft px-4 py-3.5">
                <span className="font-body text-sm font-medium text-ink">
                  {mentor.sessionDurationMinutes}-min session
                </span>
                <span className="font-display text-base font-bold text-ink">
                  {formatPrice(mentor.price)}
                </span>
              </div>

              <button
                type="button"
                disabled={!selectedSlotId}
                onClick={() => setConfirmed(true)}
                className="mt-5 w-full rounded-button bg-blue px-5 py-3 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                Confirm & pay {formatPrice(mentor.price)}
              </button>
              <p className="mt-3 text-center font-body text-[12.5px] text-sub">
                Demo booking flow — no real payment is charged yet. Live payments and calendar
                sync are coming soon.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
