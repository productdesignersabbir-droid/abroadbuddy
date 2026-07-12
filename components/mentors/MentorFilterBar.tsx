"use client";

import { COUNTRIES, MAJORS, SESSION_TYPES } from "@/data/mentors";
import {
  ALL_COUNTRIES,
  ALL_FIELDS,
  ALL_SESSION_TYPES,
  MAX_PRICE,
  MIN_PRICE,
  type MentorFilters,
} from "@/lib/mentor-match";

const fieldLabel =
  "font-label text-[11px] uppercase tracking-[0.08em] text-sub";
const selectClass =
  "mt-2 w-full rounded-button border-[1.5px] border-line bg-white px-3.5 py-2.5 font-body text-sm font-medium text-ink transition-colors focus-visible:border-blue";

export function MentorFilterBar({
  filters,
  onChange,
}: {
  filters: MentorFilters;
  onChange: (next: MentorFilters) => void;
}) {
  return (
    <div className="rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] sm:p-6.5">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="sessionType" className={fieldLabel}>
            Session type
          </label>
          <select
            id="sessionType"
            value={filters.sessionType}
            onChange={(e) =>
              onChange({ ...filters, sessionType: e.target.value })
            }
            className={selectClass}
          >
            <option>{ALL_SESSION_TYPES}</option>
            {SESSION_TYPES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="mentorCountry" className={fieldLabel}>
            Destination
          </label>
          <select
            id="mentorCountry"
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
          <label htmlFor="mentorField" className={fieldLabel}>
            Field
          </label>
          <select
            id="mentorField"
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
          <div className="flex items-baseline justify-between">
            <label htmlFor="maxPrice" className={fieldLabel}>
              Max price / session
            </label>
            <span className="font-display text-base font-bold text-blue">
              {filters.maxPrice >= MAX_PRICE ? "Any" : `$${filters.maxPrice}`}
            </span>
          </div>
          <input
            id="maxPrice"
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={5}
            value={filters.maxPrice}
            onChange={(e) =>
              onChange({ ...filters, maxPrice: parseInt(e.target.value, 10) })
            }
            className="mt-4 w-full accent-blue"
          />
        </div>
      </div>
    </div>
  );
}
