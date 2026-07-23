"use client";

import { COUNTRIES, VISA_OUTCOMES } from "@/data/visa-stories";
import {
  ALL_COUNTRIES,
  ALL_OUTCOMES,
  type SortMode,
  type VisaStoryFilters,
} from "@/lib/visa-story-match";

const fieldLabel = "font-label text-[11px] uppercase tracking-[0.08em] text-sub";
const selectClass =
  "mt-2 w-full rounded-button border-[1.5px] border-line bg-white px-3.5 py-2.5 font-body text-sm font-medium text-ink transition-colors focus-visible:border-blue";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "reactions", label: "Most reactions" },
];

export function VisaStoryFilterBar({
  filters,
  onChange,
}: {
  filters: VisaStoryFilters;
  onChange: (next: VisaStoryFilters) => void;
}) {
  return (
    <div className="rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] sm:p-6.5">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="visaCountry" className={fieldLabel}>
            Destination
          </label>
          <select
            id="visaCountry"
            value={filters.country}
            onChange={(e) => onChange({ ...filters, country: e.target.value })}
            className={selectClass}
          >
            <option>{ALL_COUNTRIES}</option>
            {COUNTRIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="visaOutcome" className={fieldLabel}>
            Outcome
          </label>
          <select
            id="visaOutcome"
            value={filters.outcome}
            onChange={(e) => onChange({ ...filters, outcome: e.target.value })}
            className={selectClass}
          >
            <option>{ALL_OUTCOMES}</option>
            {VISA_OUTCOMES.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <div>
          <div className={fieldLabel}>Sort by</div>
          <div className="mt-2 flex gap-2">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ ...filters, sort: opt.value })}
                className={`flex-1 rounded-button border-[1.5px] px-3.5 py-2.5 font-body text-sm font-semibold transition-colors ${
                  filters.sort === opt.value
                    ? "border-blue bg-blue/5 text-blue"
                    : "border-line text-ink"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
