"use client";

import { DEGREE_LEVELS, FUNDING_TYPES, SCHOLARSHIP_COUNTRIES } from "@/data/scholarships";
import {
  ALL_COUNTRIES,
  ALL_DEGREE_LEVELS,
  ALL_FUNDING_TYPES,
  MAX_CGPA,
  MIN_CGPA,
  type ScholarshipFilters,
} from "@/lib/scholarship-match";

const fieldLabel = "font-label text-[11px] uppercase tracking-[0.08em] text-sub";
const selectClass =
  "mt-2 w-full rounded-button border-[1.5px] border-line bg-white px-3.5 py-2.5 font-body text-sm font-medium text-ink transition-colors focus-visible:border-blue";

export function ScholarshipFilterBar({
  filters,
  onChange,
}: {
  filters: ScholarshipFilters;
  onChange: (next: ScholarshipFilters) => void;
}) {
  return (
    <div className="rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] sm:p-6.5">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="scholarshipCountry" className={fieldLabel}>
            Country
          </label>
          <select
            id="scholarshipCountry"
            value={filters.country}
            onChange={(e) => onChange({ ...filters, country: e.target.value })}
            className={selectClass}
          >
            <option value={ALL_COUNTRIES}>{ALL_COUNTRIES}</option>
            {SCHOLARSHIP_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="scholarshipDegreeLevel" className={fieldLabel}>
            Degree level
          </label>
          <select
            id="scholarshipDegreeLevel"
            value={filters.degreeLevel}
            onChange={(e) => onChange({ ...filters, degreeLevel: e.target.value })}
            className={selectClass}
          >
            <option value={ALL_DEGREE_LEVELS}>{ALL_DEGREE_LEVELS}</option>
            {DEGREE_LEVELS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="scholarshipFundingType" className={fieldLabel}>
            Funding type
          </label>
          <select
            id="scholarshipFundingType"
            value={filters.fundingType}
            onChange={(e) => onChange({ ...filters, fundingType: e.target.value })}
            className={selectClass}
          >
            <option value={ALL_FUNDING_TYPES}>{ALL_FUNDING_TYPES}</option>
            {FUNDING_TYPES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="scholarshipCgpa" className={fieldLabel}>
              Your CGPA
            </label>
            <span className="font-display text-sm font-bold text-blue">
              {filters.cgpa.toFixed(2)}
            </span>
          </div>
          <input
            id="scholarshipCgpa"
            type="range"
            min={MIN_CGPA}
            max={MAX_CGPA}
            step={0.05}
            value={filters.cgpa}
            onChange={(e) => onChange({ ...filters, cgpa: parseFloat(e.target.value) })}
            className="mt-4.5 w-full accent-blue"
            aria-label="Your CGPA"
          />
          <p className="mt-1.5 font-body text-[12px] text-sub">
            Shows scholarships whose minimum CGPA is at or below this.
          </p>
        </div>
      </div>
    </div>
  );
}
