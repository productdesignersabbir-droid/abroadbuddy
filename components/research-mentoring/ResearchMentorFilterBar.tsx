"use client";

import { RESEARCH_CATEGORIES, RESEARCH_INTERESTS } from "@/data/research-mentors";
import {
  ALL_CATEGORIES,
  ALL_INTERESTS,
  type ResearchMentorFilters,
  type SortMode,
} from "@/lib/research-mentor-match";

const fieldLabel = "font-label text-[11px] uppercase tracking-[0.08em] text-sub";
const selectClass =
  "mt-2 w-full rounded-button border-[1.5px] border-line bg-white px-3.5 py-2.5 font-body text-sm font-medium text-ink transition-colors focus-visible:border-blue";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "rating", label: "Top rated" },
  { value: "price", label: "Lowest price" },
];

export function ResearchMentorFilterBar({
  filters,
  onChange,
}: {
  filters: ResearchMentorFilters;
  onChange: (next: ResearchMentorFilters) => void;
}) {
  return (
    <div className="rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] sm:p-6.5">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="researchCategory" className={fieldLabel}>
            Category
          </label>
          <select
            id="researchCategory"
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className={selectClass}
          >
            <option>{ALL_CATEGORIES}</option>
            {RESEARCH_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="researchInterest" className={fieldLabel}>
            Research interest
          </label>
          <select
            id="researchInterest"
            value={filters.interest}
            onChange={(e) => onChange({ ...filters, interest: e.target.value })}
            className={selectClass}
          >
            <option>{ALL_INTERESTS}</option>
            {RESEARCH_INTERESTS.map((interest) => (
              <option key={interest}>{interest}</option>
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
