"use client";

import { COUNTRIES, MAJORS } from "@/data/labs";
import { COUNTRY_INFO, REGIONS } from "@/data/universities";
import { ALL_COUNTRIES, ALL_FIELDS, type LabFilters } from "@/lib/lab-match";

const fieldLabel =
  "font-label text-[11px] uppercase tracking-[0.08em] text-sub";
const selectClass =
  "mt-2 w-full rounded-[12px] border-[1.5px] border-line bg-white px-3.5 py-2.5 font-body text-sm font-medium text-ink transition-colors focus-visible:border-blue";

export function LabSearchFilterBar({
  filters,
  onChange,
  countryCounts,
  fieldCounts,
}: {
  filters: LabFilters;
  onChange: (next: LabFilters) => void;
  countryCounts: Record<string, number>;
  fieldCounts: Record<string, number>;
}) {
  return (
    <div className="rounded-card bg-white p-5.5 sm:p-6.5">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <label htmlFor="labSearch" className={fieldLabel}>
            Search professor, university or topic
          </label>
          <div className="relative mt-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sub"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              id="labSearch"
              type="text"
              value={filters.search}
              onChange={(e) => onChange({ ...filters, search: e.target.value })}
              placeholder="e.g. KAUST, solar cells, Prof. Rahman…"
              className="w-full rounded-[12px] border-[1.5px] border-line bg-white py-2.5 pl-10 pr-3.5 font-body text-sm font-medium text-ink transition-colors focus-visible:border-blue"
            />
          </div>
        </div>

        <div>
          <label htmlFor="labCountry" className={fieldLabel}>
            Destination
          </label>
          <select
            id="labCountry"
            value={filters.country}
            onChange={(e) => onChange({ ...filters, country: e.target.value })}
            className={selectClass}
          >
            <option>{ALL_COUNTRIES}</option>
            {REGIONS.map((region) => {
              const inRegion = COUNTRIES.filter(
                (c) => COUNTRY_INFO[c].region === region && countryCounts[c]
              );
              if (inRegion.length === 0) return null;
              return (
                <optgroup key={region} label={region}>
                  {inRegion.map((c) => (
                    <option key={c} value={c}>
                      {COUNTRY_INFO[c].flag} {c} ({countryCounts[c]})
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
        </div>

        <div>
          <label htmlFor="labField" className={fieldLabel}>
            Research field
          </label>
          <select
            id="labField"
            value={filters.field}
            onChange={(e) => onChange({ ...filters, field: e.target.value })}
            className={selectClass}
          >
            <option>{ALL_FIELDS}</option>
            {[...MAJORS]
              .filter((m) => fieldCounts[m])
              .sort()
              .map((m) => (
                <option key={m} value={m}>
                  {m} ({fieldCounts[m]})
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-5">
        <button
          type="button"
          aria-pressed={filters.openOnly}
          onClick={() => onChange({ ...filters, openOnly: !filters.openOnly })}
          className={`inline-flex items-center gap-2 rounded-pill px-3.5 py-1.5 font-body text-[13px] font-medium transition-colors ${
            filters.openOnly ? "bg-ink text-white" : "bg-soft text-ink hover:bg-softer"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-[#2f9e6b]" aria-hidden />
          Taking students now
        </button>
      </div>
    </div>
  );
}
