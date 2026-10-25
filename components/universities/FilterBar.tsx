"use client";

import type { CSSProperties, ReactNode } from "react";
import { COUNTRIES, COUNTRY_INFO, MAJORS, REGIONS, type Country } from "@/data/universities";
import {
  ALL_COUNTRIES,
  ALL_MAJORS,
  MAX_BUDGET,
  SORT_OPTIONS,
  type UniversityFilters,
} from "@/lib/university-match";

const POPULAR: Country[] = ["USA", "UK", "Canada", "Australia", "Germany", "Japan"];

const CGPA_MIN = 2;
const CGPA_MAX = 4;

/** Feeds the filled part of a `.range-soft` slider. */
const fill = (value: number, min: number, max: number) =>
  ({ "--pct": `${((value - min) / (max - min)) * 100}%` }) as CSSProperties;

function Segment({
  label,
  htmlFor,
  value,
  children,
}: {
  label: string;
  htmlFor: string;
  value?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative rounded-[22px] px-5 py-4 transition-colors focus-within:bg-soft hover:bg-soft">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="font-body text-[13px] text-sub">
          {label}
        </label>
        {value}
      </div>
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

export function FilterBar({
  filters,
  onChange,
}: {
  filters: UniversityFilters;
  onChange: (next: UniversityFilters) => void;
}) {
  const anyBudget = filters.budget >= MAX_BUDGET;

  return (
    <div>
      <div className="grid grid-cols-1 gap-1 rounded-[28px] bg-white p-2 sm:grid-cols-2 lg:grid-cols-[1fr_1.15fr_1.15fr_1fr]">
        <Segment
          label="Your CGPA"
          htmlFor="cgpa"
          value={
            <span className="font-display text-[24px] leading-none tracking-[-0.02em] text-ink">
              {filters.cgpa.toFixed(2)}
            </span>
          }
        >
          <input
            id="cgpa"
            type="range"
            min={CGPA_MIN}
            max={CGPA_MAX}
            step={0.05}
            value={filters.cgpa}
            onChange={(e) => onChange({ ...filters, cgpa: parseFloat(e.target.value) })}
            style={fill(filters.cgpa, CGPA_MIN, CGPA_MAX)}
            className="range-soft mt-4"
          />
        </Segment>

        <Segment label="Destination" htmlFor="country">
          <div className="relative mt-1.5">
            <select
              id="country"
              value={filters.country}
              onChange={(e) => onChange({ ...filters, country: e.target.value })}
              className={selectClass}
            >
              <option value={ALL_COUNTRIES}>Anywhere</option>
              {REGIONS.map((region) => (
                <optgroup key={region} label={region}>
                  {COUNTRIES.filter((c) => COUNTRY_INFO[c].region === region).map((c) => (
                    <option key={c} value={c}>
                      {COUNTRY_INFO[c].flag} {c}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <Chevron />
          </div>
        </Segment>

        <Segment label="Major" htmlFor="major">
          <div className="relative mt-1.5">
            <select
              id="major"
              value={filters.major}
              onChange={(e) => onChange({ ...filters, major: e.target.value })}
              className={selectClass}
            >
              <option value={ALL_MAJORS}>Any major</option>
              {[...MAJORS].sort().map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <Chevron />
          </div>
        </Segment>

        <Segment
          label="Max tuition / year"
          htmlFor="budget"
          value={
            <span className="font-display text-[24px] leading-none tracking-[-0.02em] text-ink">
              {anyBudget ? "Any" : `$${Math.round(filters.budget / 1000)}k`}
            </span>
          }
        >
          <input
            id="budget"
            type="range"
            min={0}
            max={MAX_BUDGET}
            step={1000}
            value={filters.budget}
            onChange={(e) => onChange({ ...filters, budget: parseInt(e.target.value, 10) })}
            style={fill(filters.budget, 0, MAX_BUDGET)}
            className="range-soft mt-4"
          />
        </Segment>
      </div>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-body text-[13px] text-sub">Popular</span>
          {POPULAR.map((c) => {
            const active = filters.country === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ ...filters, country: active ? ALL_COUNTRIES : c })}
                className={`flex items-center gap-1.5 rounded-pill px-3.5 py-1.5 font-body text-[13.5px] transition-colors ${
                  active ? "bg-ink text-white" : "bg-white text-ink hover:bg-softer"
                }`}
              >
                <span className="text-[15px] leading-none">{COUNTRY_INFO[c].flag}</span>
                {c}
              </button>
            );
          })}
        </div>

        <div
          role="group"
          aria-label="Sort results"
          className="flex w-fit items-center gap-1 rounded-pill bg-white p-1"
        >
          {SORT_OPTIONS.map((opt) => {
            const active = filters.sort === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ ...filters, sort: opt.value })}
                className={`rounded-pill px-3.5 py-1.5 font-body text-[13.5px] transition-colors ${
                  active ? "bg-soft text-ink" : "text-sub hover:text-ink"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
