"use client";

import { DEGREE_LEVELS, FUNDING_TYPES, SCHOLARSHIP_COUNTRIES } from "@/data/scholarships";
import {
  ALL_COUNTRIES,
  ALL_DEGREE_LEVELS,
  ALL_FUNDING_TYPES,
  ALL_REGIONS,
  MAX_CGPA,
  MIN_CGPA,
  REGIONS,
  type Region,
  type ScholarshipFilters,
} from "@/lib/scholarship-match";

type QuickFilter = {
  label: string;
  isOn: (f: ScholarshipFilters) => boolean;
  toggle: (f: ScholarshipFilters) => ScholarshipFilters;
};

// One-tap shortcuts for the most common searches. Each one flips a filter in
// the selects below, so the two always stay in sync.
const QUICK_FILTERS: QuickFilter[] = [
  {
    label: "Fully funded",
    isOn: (f) => f.fundingType === "Fully Funded",
    toggle: (f) => ({
      ...f,
      fundingType: f.fundingType === "Fully Funded" ? ALL_FUNDING_TYPES : "Fully Funded",
    }),
  },
  {
    label: "Master's",
    isOn: (f) => f.degreeLevel === "Master's",
    toggle: (f) => ({
      ...f,
      degreeLevel: f.degreeLevel === "Master's" ? ALL_DEGREE_LEVELS : "Master's",
    }),
  },
  {
    label: "PhD",
    isOn: (f) => f.degreeLevel === "PhD",
    toggle: (f) => ({
      ...f,
      degreeLevel: f.degreeLevel === "PhD" ? ALL_DEGREE_LEVELS : "PhD",
    }),
  },
  {
    label: "Closing soon",
    isOn: (f) => f.closingSoonOnly,
    toggle: (f) => ({ ...f, closingSoonOnly: !f.closingSoonOnly }),
  },
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-pill border-[1.5px] px-3.5 py-1.5 font-body text-[13px] font-semibold transition-colors ${
        active
          ? "border-blue bg-blue text-white"
          : "border-line bg-white text-ink hover:border-blue/40"
      }`}
    >
      {children}
    </button>
  );
}

const fieldLabel = "font-label text-[11px] uppercase tracking-[0.08em] text-sub";
const selectClass =
  "mt-2 w-full rounded-[12px] border-[1.5px] border-line bg-white px-3.5 py-2.5 font-body text-sm font-medium text-ink transition-colors focus-visible:border-blue";

export function ScholarshipFilterBar({
  filters,
  onChange,
  regionCounts,
  total,
}: {
  filters: ScholarshipFilters;
  onChange: (next: ScholarshipFilters) => void;
  regionCounts: Record<Region, number>;
  total: number;
}) {
  return (
    <div className="rounded-card bg-white p-5.5 sm:p-6.5">
      <div className="flex flex-col gap-4 border-b border-line pb-5.5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Quick filters" className="flex flex-wrap gap-2">
          {QUICK_FILTERS.map((q) => (
            <Chip key={q.label} active={q.isOn(filters)} onClick={() => onChange(q.toggle(filters))}>
              {q.label}
            </Chip>
          ))}
        </div>

        <div role="group" aria-label="Region" className="flex flex-wrap gap-2">
          <Chip
            active={filters.region === ALL_REGIONS}
            onClick={() => onChange({ ...filters, region: ALL_REGIONS })}
          >
            All regions <span className="opacity-60">{total}</span>
          </Chip>
          {REGIONS.filter((r) => regionCounts[r] > 0).map((region) => (
            <Chip
              key={region}
              active={filters.region === region}
              onClick={() =>
                onChange({
                  ...filters,
                  region: filters.region === region ? ALL_REGIONS : region,
                })
              }
            >
              {region} <span className="opacity-60">{regionCounts[region]}</span>
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-5.5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            <span className="font-body text-sm font-semibold text-blue">
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
