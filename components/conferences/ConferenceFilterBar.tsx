"use client";

import type { ReactNode } from "react";
import { CONFERENCE_TYPES, MAJORS } from "@/data/conferences";
import {
  ALL_FIELDS,
  ALL_LOCATIONS,
  ALL_TYPES,
  type ConferenceFilters,
} from "@/lib/conference-match";

function Segment({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="relative rounded-[22px] px-5 py-4 transition-colors focus-within:bg-soft hover:bg-soft">
      <label htmlFor={htmlFor} className="font-body text-[13px] text-sub">
        {label}
      </label>
      {children}
    </div>
  );
}

function Chevron() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-sub"
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const selectClass =
  "w-full cursor-pointer appearance-none truncate bg-transparent pr-6 font-display text-[24px] leading-tight tracking-[-0.02em] text-ink outline-none";

const QUICK: { label: string; apply: (f: ConferenceFilters) => ConferenceFilters; on: (f: ConferenceFilters) => boolean }[] = [
  {
    label: "Open for submissions",
    on: (f) => f.openOnly,
    apply: (f) => ({ ...f, openOnly: !f.openOnly }),
  },
  {
    label: "🇧🇩 In Bangladesh",
    on: (f) => f.location === "Local",
    apply: (f) => ({ ...f, location: f.location === "Local" ? ALL_LOCATIONS : "Local" }),
  },
  {
    label: "International",
    on: (f) => f.location === "International",
    apply: (f) => ({ ...f, location: f.location === "International" ? ALL_LOCATIONS : "International" }),
  },
  {
    label: "Research fests",
    on: (f) => f.type === "Research Fest",
    apply: (f) => ({ ...f, type: f.type === "Research Fest" ? ALL_TYPES : "Research Fest" }),
  },
];

export function ConferenceFilterBar({
  filters,
  onChange,
}: {
  filters: ConferenceFilters;
  onChange: (next: ConferenceFilters) => void;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-1 rounded-[28px] bg-white p-2 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
        <Segment label="Search" htmlFor="conferenceQuery">
          <div className="relative mt-1.5">
            <input
              id="conferenceQuery"
              type="search"
              value={filters.query}
              onChange={(e) => onChange({ ...filters, query: e.target.value })}
              placeholder="Event, host or city"
              className="w-full bg-transparent pr-7 font-display text-[24px] leading-tight tracking-[-0.02em] text-ink outline-none placeholder:text-ink/35"
            />
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-sub"
            >
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
              <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </Segment>

        <Segment label="Field" htmlFor="conferenceField">
          <div className="relative mt-1.5">
            <select
              id="conferenceField"
              value={filters.field}
              onChange={(e) => onChange({ ...filters, field: e.target.value })}
              className={selectClass}
            >
              <option value={ALL_FIELDS}>Any field</option>
              {[...MAJORS].sort().map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <Chevron />
          </div>
        </Segment>

        <Segment label="Where" htmlFor="conferenceLocation">
          <div className="relative mt-1.5">
            <select
              id="conferenceLocation"
              value={filters.location}
              onChange={(e) => onChange({ ...filters, location: e.target.value })}
              className={selectClass}
            >
              <option value={ALL_LOCATIONS}>Anywhere</option>
              <option value="Local">In Bangladesh</option>
              <option value="International">International</option>
            </select>
            <Chevron />
          </div>
        </Segment>

        <Segment label="Type" htmlFor="conferenceType">
          <div className="relative mt-1.5">
            <select
              id="conferenceType"
              value={filters.type}
              onChange={(e) => onChange({ ...filters, type: e.target.value })}
              className={selectClass}
            >
              <option value={ALL_TYPES}>Any type</option>
              {CONFERENCE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <Chevron />
          </div>
        </Segment>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 font-body text-[13px] text-sub">Quick filters</span>
        {QUICK.map((q) => {
          const active = q.on(filters);
          return (
            <button
              key={q.label}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(q.apply(filters))}
              className={`rounded-pill px-3.5 py-1.5 font-body text-[13.5px] transition-colors ${
                active ? "bg-ink text-white" : "bg-white text-ink hover:bg-softer"
              }`}
            >
              {q.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
