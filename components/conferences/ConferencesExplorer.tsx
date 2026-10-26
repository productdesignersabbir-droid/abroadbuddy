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
import { ConferenceDetailsModal } from "@/components/conferences/ConferenceDetailsModal";
import { ConferenceCalendarView } from "@/components/conferences/ConferenceCalendarView";

const PAGE_SIZE = 12;

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "deadline", label: "Deadline soonest" },
  { value: "eventDate", label: "Event date" },
];

export function ConferencesExplorer({ conferences }: { conferences: Conference[] }) {
  const [filters, setFiltersState] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortMode>(DEFAULT_SORT);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const setFilters = (next: typeof DEFAULT_FILTERS) => {
    setFiltersState(next);
    setVisible(PAGE_SIZE);
  };
  const [selected, setSelected] = useState<Conference | null>(null);

  // Other events in the same field, soonest open deadline first.
  const related = useMemo(() => {
    if (!selected) return [];
    return sortConferences(
      conferences.filter(
        (c) => c.id !== selected.id && c.fields.some((f) => selected.fields.includes(f))
      ),
      "deadline"
    ).slice(0, 3);
  }, [conferences, selected]);

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
    filters.query !== DEFAULT_FILTERS.query ||
    filters.field !== DEFAULT_FILTERS.field ||
    filters.location !== DEFAULT_FILTERS.location ||
    filters.type !== DEFAULT_FILTERS.type ||
    filters.openOnly !== DEFAULT_FILTERS.openOnly;

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        {/* The calendar is the heart of this page, so it comes first. */}
        <ConferenceCalendarView conferences={results} onOpen={setSelected} />

        <div className="mt-10">
          <ConferenceFilterBar filters={filters} onChange={setFilters} />
        </div>

        <div className="mt-6">
          <ClosingSoonStrip conferences={closingSoon} onOpen={setSelected} />
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-sm text-sub">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "event" : "events"} match your filters
            {isDirty && (
              <button
                type="button"
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="ml-3 font-body text-[13px] font-medium text-blue underline-offset-4 hover:underline"
              >
                Reset filters
              </button>
            )}
          </p>

          <div
            role="group"
            aria-label="Sort events"
            className="inline-flex items-center gap-1 self-start rounded-pill bg-white p-1"
          >
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={sort === option.value}
                onClick={() => setSort(option.value)}
                className={`rounded-pill px-3.5 py-1.5 font-body text-[13.5px] transition-colors ${
                  sort === option.value ? "bg-soft text-ink" : "text-sub hover:text-ink"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {results.length > 0 ? (
          <>
            <div className="mt-6 flex flex-col gap-4">
              {results.slice(0, visible).map((conference) => (
                <ConferenceCard
                  key={conference.id}
                  conference={conference}
                  onOpen={() => setSelected(conference)}
                />
              ))}
            </div>
            {visible < results.length && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="rounded-button border-[1.5px] border-line bg-white px-6 py-3 font-body text-sm font-semibold text-ink transition-colors hover:border-ink/40"
                >
                  Show more ({results.length - visible} left)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-6 rounded-card border border-dashed border-line bg-white px-6 py-14 text-center">
            <p className="font-display text-[26px] leading-tight tracking-[-0.02em] text-ink">
              No events match those filters
            </p>
            <p className="mt-2 font-body text-sm text-sub">
              Try a different search, or set field and location back to any.
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

      {selected && (
        <ConferenceDetailsModal
          conference={selected}
          related={related}
          onSelect={setSelected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
