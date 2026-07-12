"use client";

import { COUNTRIES, MAJORS } from "@/data/stories";
import { ALL_COUNTRIES, ALL_FIELDS, type SortMode, type StoryFilters } from "@/lib/story-match";

const fieldLabel = "font-label text-[11px] uppercase tracking-[0.08em] text-sub";
const selectClass =
  "mt-2 w-full rounded-button border-[1.5px] border-line bg-white px-3.5 py-2.5 font-body text-sm font-medium text-ink transition-colors focus-visible:border-blue";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "reactions", label: "Most reactions" },
];

export function StoryFilterBar({
  filters,
  onChange,
}: {
  filters: StoryFilters;
  onChange: (next: StoryFilters) => void;
}) {
  return (
    <div className="rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] sm:p-6.5">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="storyCountry" className={fieldLabel}>
            Destination
          </label>
          <select
            id="storyCountry"
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
          <label htmlFor="storyField" className={fieldLabel}>
            Field
          </label>
          <select
            id="storyField"
            value={filters.field}
            onChange={(e) => onChange({ ...filters, field: e.target.value })}
            className={selectClass}
          >
            <option>{ALL_FIELDS}</option>
            {MAJORS.map((m) => (
              <option key={m}>{m}</option>
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
