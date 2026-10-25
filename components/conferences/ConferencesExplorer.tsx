"use client";

import { useMemo, useState } from "react";
import type { Conference } from "@/data/conferences";
import {
  DEFAULT_FILTERS,
  DEFAULT_SORT,
  isClosingSoon,
  passesConferenceFilters,
  sortConferences,
  type SortMode,
} from "@/lib/conference-match";
import { ConferenceFilterBar } from "@/components/conferences/ConferenceFilterBar";
import { ConferenceCard } from "@/components/conferences/ConferenceCard";
import { ClosingSoonStrip } from "@/components/conferences/ClosingSoonStrip";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "deadline", label: "Deadline (soonest)" },
  { value: "eventDate", label: "Event date" },
];

export function ConferencesExplorer({ conferences }: { conferences: Conference[] }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortMode>(DEFAULT_SORT);

  const closingSoon = useMemo(
    () =>
      sortConferences(
        conferences.filter((c) => isClosingSoon(c.deadline)),
        "deadline"
      ).slice(0, 3),
    [conferences]
  );

  const results = useMemo(() => {
    const filtered = conferences.filter((c) => passesConferenceFilters(c, filters));
    return sortConferences(filtered, sort);
  }, [conferences, filters, sort]);

  const isDirty =
    filters.field !== DEFAULT_FILTERS.field ||
    filters.location !== DEFAULT_FILTERS.location ||
    filters.type !== DEFAULT_FILTERS.type;

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        <ClosingSoonStrip conferences={closingSoon} />

        <div className="mt-6">
          <ConferenceFilterBar filters={filters} onChange={setFilters} />
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-sm text-sub">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "event" : "events"} match your filters
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
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSort(option.value)}
                className={`rounded-pill px-3.5 py-1.5 font-label text-[11px] font-semibold uppercase tracking-[0.04em] transition-colors ${
                  sort === option.value
                    ? "bg-blue text-white"
                    : "text-sub hover:text-ink"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {results.length > 0 ? (
          <div className="mt-6 flex flex-col gap-4">
            {results.map((conference) => (
              <ConferenceCard key={conference.id} conference={conference} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-card border border-dashed border-line bg-white px-6 py-14 text-center">
            <p className="font-display text-[26px] leading-tight tracking-[-0.02em] text-ink">
              No events match those filters
            </p>
            <p className="mt-2 font-body text-sm text-sub">
              Try switching to &quot;All Fields&quot; or &quot;All Locations&quot;.
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
