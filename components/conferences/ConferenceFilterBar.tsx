"use client";

import { CONFERENCE_TYPES, MAJORS } from "@/data/conferences";
import {
  ALL_FIELDS,
  ALL_LOCATIONS,
  ALL_TYPES,
  type ConferenceFilters,
} from "@/lib/conference-match";

const fieldLabel = "font-label text-[11px] uppercase tracking-[0.08em] text-sub";
const selectClass =
  "mt-2 w-full rounded-[12px] border-[1.5px] border-line bg-white px-3.5 py-2.5 font-body text-sm font-medium text-ink transition-colors focus-visible:border-blue";

export function ConferenceFilterBar({
  filters,
  onChange,
}: {
  filters: ConferenceFilters;
  onChange: (next: ConferenceFilters) => void;
}) {
  return (
    <div className="rounded-card bg-white p-5.5 sm:p-6.5">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="conferenceField" className={fieldLabel}>
            Field / discipline
          </label>
          <select
            id="conferenceField"
            value={filters.field}
            onChange={(e) => onChange({ ...filters, field: e.target.value })}
            className={selectClass}
          >
            <option value={ALL_FIELDS}>{ALL_FIELDS}</option>
            {MAJORS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="conferenceLocation" className={fieldLabel}>
            Location
          </label>
          <select
            id="conferenceLocation"
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
            className={selectClass}
          >
            <option value={ALL_LOCATIONS}>{ALL_LOCATIONS}</option>
            <option value="Local">Local (Bangladesh)</option>
            <option value="International">International</option>
          </select>
        </div>

        <div>
          <label htmlFor="conferenceType" className={fieldLabel}>
            Type
          </label>
          <select
            id="conferenceType"
            value={filters.type}
            onChange={(e) => onChange({ ...filters, type: e.target.value })}
            className={selectClass}
          >
            <option value={ALL_TYPES}>{ALL_TYPES}</option>
            {CONFERENCE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
