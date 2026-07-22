"use client";

import { useMemo, useState } from "react";
import type { Scholarship } from "@/data/scholarships";
import {
  DEFAULT_FILTERS,
  isClosingSoon,
  passesScholarshipFilters,
  sortScholarshipsByDeadline,
} from "@/lib/scholarship-match";
import { ScholarshipFilterBar } from "@/components/scholarships/ScholarshipFilterBar";
import { ScholarshipClosingSoonStrip } from "@/components/scholarships/ScholarshipClosingSoonStrip";
import { ScholarshipCalendarView } from "@/components/scholarships/ScholarshipCalendarView";
import { ScholarshipListView } from "@/components/scholarships/ScholarshipListView";

type ViewMode = "calendar" | "list";

const VIEW_OPTIONS: { value: ViewMode; label: string }[] = [
  { value: "calendar", label: "Calendar view" },
  { value: "list", label: "List view" },
];

export function ScholarshipsExplorer({ scholarships }: { scholarships: Scholarship[] }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [view, setView] = useState<ViewMode>("calendar");

  const closingSoon = useMemo(
    () =>
      sortScholarshipsByDeadline(
        scholarships.filter((s) => isClosingSoon(s.deadline))
      ).slice(0, 3),
    [scholarships]
  );

  const results = useMemo(() => {
    const filtered = scholarships.filter((s) => passesScholarshipFilters(s, filters));
    return sortScholarshipsByDeadline(filtered);
  }, [scholarships, filters]);

  const isDirty =
    filters.country !== DEFAULT_FILTERS.country ||
    filters.degreeLevel !== DEFAULT_FILTERS.degreeLevel ||
    filters.fundingType !== DEFAULT_FILTERS.fundingType ||
    filters.cgpa !== DEFAULT_FILTERS.cgpa;

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        <ScholarshipClosingSoonStrip scholarships={closingSoon} />

        <div className="mt-6">
          <ScholarshipFilterBar filters={filters} onChange={setFilters} />
        </div>

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
            <p className="font-display text-lg font-bold text-ink">
              No scholarships match those filters
            </p>
            <p className="mt-2 font-body text-sm text-sub">
              Try raising your CGPA or switching to &quot;All Countries&quot;.
            </p>
            <button
              type="button"
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="mt-5 rounded-button bg-blue px-5 py-2.5 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)]"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
