"use client";

import { DESTINATIONS } from "@/data/resources";
import { ALL_DESTINATIONS } from "@/lib/resource-match";

export function DestinationSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] sm:p-6.5">
      <label className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
        Destination
      </label>
      <p className="mt-1 font-body text-[13px] text-sub">
        Pick a country or city to see housing, flights and living costs for that destination.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange(ALL_DESTINATIONS)}
          className={`rounded-pill px-3.5 py-1.5 font-label text-[11px] font-semibold uppercase tracking-[0.04em] transition-colors ${
            value === ALL_DESTINATIONS
              ? "bg-blue text-white"
              : "border border-line bg-soft text-sub hover:text-ink"
          }`}
        >
          All destinations
        </button>
        {DESTINATIONS.map((destination) => (
          <button
            key={destination.id}
            type="button"
            onClick={() => onChange(destination.id)}
            className={`rounded-pill px-3.5 py-1.5 font-label text-[11px] font-semibold uppercase tracking-[0.04em] transition-colors ${
              value === destination.id
                ? "bg-blue text-white"
                : "border border-line bg-soft text-sub hover:text-ink"
            }`}
          >
            {destination.label}
          </button>
        ))}
      </div>
    </div>
  );
}
