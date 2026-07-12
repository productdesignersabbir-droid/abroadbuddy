"use client";

import { COUNTRIES, MAJORS } from "@/data/universities";
import {
  ALL_COUNTRIES,
  ALL_MAJORS,
  MAX_BUDGET,
  type UniversityFilters,
} from "@/lib/university-match";

const fieldLabel =
  "font-label text-[11px] uppercase tracking-[0.08em] text-sub";
const selectClass =
  "mt-2 w-full rounded-button border-[1.5px] border-line bg-white px-3.5 py-2.5 font-body text-sm font-medium text-ink transition-colors focus-visible:border-blue";

export function FilterBar({
  filters,
  onChange,
}: {
  filters: UniversityFilters;
  onChange: (next: UniversityFilters) => void;
}) {
  return (
    <div className="rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] sm:p-6.5">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="cgpa" className={fieldLabel}>
              Your CGPA
            </label>
            <span className="font-display text-base font-bold text-blue">
              {filters.cgpa.toFixed(2)}
            </span>
          </div>
          <input
            id="cgpa"
            type="range"
            min={2}
            max={4}
            step={0.05}
            value={filters.cgpa}
            onChange={(e) =>
              onChange({ ...filters, cgpa: parseFloat(e.target.value) })
            }
            className="mt-4 w-full accent-blue"
          />
        </div>

        <div>
          <label htmlFor="country" className={fieldLabel}>
            Destination
          </label>
          <select
            id="country"
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
          <label htmlFor="major" className={fieldLabel}>
            Major
          </label>
          <select
            id="major"
            value={filters.major}
            onChange={(e) => onChange({ ...filters, major: e.target.value })}
            className={selectClass}
          >
            <option>{ALL_MAJORS}</option>
            {MAJORS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="budget" className={fieldLabel}>
              Max budget / year
            </label>
            <span className="font-display text-base font-bold text-blue">
              {filters.budget >= MAX_BUDGET
                ? "Any"
                : `$${Math.round(filters.budget / 1000)}k`}
            </span>
          </div>
          <input
            id="budget"
            type="range"
            min={5000}
            max={MAX_BUDGET}
            step={1000}
            value={filters.budget}
            onChange={(e) =>
              onChange({ ...filters, budget: parseInt(e.target.value, 10) })
            }
            className="mt-4 w-full accent-blue"
          />
        </div>
      </div>
    </div>
  );
}
