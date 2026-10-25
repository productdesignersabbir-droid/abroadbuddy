"use client";

import { useMemo, useState } from "react";
import type { Scholarship } from "@/data/scholarships";
import {
  DEFAULT_FILTERS,
  REGIONS,
  passesScholarshipFilters,
  regionOf,
  sortScholarshipsByDeadline,
  withUpcomingDeadlines,
  type Region,
} from "@/lib/scholarship-match";
import { ScholarshipFilterBar } from "@/components/scholarships/ScholarshipFilterBar";
import { ScholarshipClosingSoonStrip } from "@/components/scholarships/ScholarshipClosingSoonStrip";
import { ScholarshipStats } from "@/components/scholarships/ScholarshipStats";
import { ScholarshipCalendarView } from "@/components/scholarships/ScholarshipCalendarView";
import { ScholarshipListView } from "@/components/scholarships/ScholarshipListView";

type ViewMode = "calendar" | "list";

const VIEW_OPTIONS: { value: ViewMode; label: string }[] = [
  { value: "calendar", label: "Calendar view" },
  { value: "list", label: "List view" },
];

export function ScholarshipsExplorer({
  scholarships: rawScholarships,
}: {
  scholarships: Scholarship[];
}) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [view, setView] = useState<ViewMode>("calendar");

  const scholarships = useMemo(
    () => withUpcomingDeadlines(rawScholarships),
    [rawScholarships]
  );

  const nextDeadlines = useMemo(
    () => sortScholarshipsByDeadline(scholarships).slice(0, 4),
    [scholarships]
  );

  const regionCounts = useMemo(() => {
    const counts = Object.fromEntries(REGIONS.map((r) => [r, 0])) as Record<Region, number>;
    for (const s of scholarships) counts[regionOf(s.country)] += 1;
    return counts;
  }, [scholarships]);

  const results = useMemo(() => {
    const filtered = scholarships.filter((s) => passesScholarshipFilters(s, filters));
    return sortScholarshipsByDeadline(filtered);
  }, [scholarships, filters]);

  const isDirty = (Object.keys(DEFAULT_FILTERS) as (keyof typeof DEFAULT_FILTERS)[]).some(
    (key) => filters[key] !== DEFAULT_FILTERS[key]
  );

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        <ScholarshipStats scholarships={scholarships} />

        <div className="mt-8">
          <ScholarshipClosingSoonStrip scholarships={nextDeadlines} />
        </div>

        <div className="mt-8">
          <ScholarshipFilterBar
            filters={filters}
            onChange={setFilters}
            regionCounts={regionCounts}
            total={scholarships.length}
          />
        </div>

        <p className="mt-4 flex items-start gap-2 rounded-xl border border-[#F5D58A] bg-[#FFF8E6] px-4 py-3 font-body text-[13px] leading-relaxed text-[#6B4E00]">
          <span aria-hidden>⚠️</span>
          <span>
            Dates and funding can change every year. Always confirm the details on the
            official website before you apply.
          </span>
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-sm text-sub">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "scholarship" : "scholarships"} match your filters
            {isDirty && (
              <button
                type="button"
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="ml-3 font-label text-[11.5px] font-semibold uppercase tracking-[0.06em] text-blue"
              >
                Reset filters
              </button>
            )}
          </p>

          <div className="inline-flex items-center gap-1 self-start rounded-pill border border-line bg-white p-1">
            {VIEW_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setView(option.value)}
                className={`rounded-pill px-3.5 py-1.5 font-label text-[11px] font-semibold uppercase tracking-[0.04em] transition-colors ${
                  view === option.value ? "bg-blue text-white" : "text-sub hover:text-ink"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {results.length > 0 ? (
          <div className="mt-6">
            {view === "calendar" ? (
              <ScholarshipCalendarView scholarships={results} />
            ) : (
              <ScholarshipListView scholarships={results} />
            )}
          </div>
        ) : (
          <div className="mt-6 rounded-card border border-dashed border-line bg-white px-6 py-14 text-center">
            <p className="font-display text-[26px] leading-tight tracking-[-0.02em] text-ink">
              No scholarships match those filters
            </p>
            <p className="mt-2 font-body text-sm text-sub">
              Try raising your CGPA or switching to &quot;All Countries&quot;.
            </p>
            <button
              type="button"
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="mt-5 rounded-button bg-blue px-5 py-2.5 font-body text-sm font-semibold text-white"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
