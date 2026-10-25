"use client";

import { useMemo, useState } from "react";
import type { University } from "@/data/universities";
import {
  DEFAULT_FILTERS,
  computeMatch,
  passesHardFilters,
  sortResults,
  type UniversityFilters,
} from "@/lib/university-match";
import { FilterBar } from "@/components/universities/FilterBar";
import { UniversityCard } from "@/components/universities/UniversityCard";
import { UniversityDetailsModal } from "@/components/universities/UniversityDetailsModal";

const PAGE_SIZE = 10;

export function UniversitiesExplorer({
  universities,
  initialFilters = DEFAULT_FILTERS,
}: {
  universities: University[];
  initialFilters?: UniversityFilters;
}) {
  const [filters, setFilters] = useState(initialFilters);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<University | null>(null);

  const results = useMemo(() => {
    const matched = universities
      .filter((uni) => passesHardFilters(uni, filters))
      .map((uni) => ({ uni, match: computeMatch(uni, filters) }));
    return sortResults(matched, filters.sort);
  }, [universities, filters]);

  const countryCount = new Set(results.map((r) => r.uni.country)).size;

  function update(next: UniversityFilters) {
    setFilters(next);
    setVisible(PAGE_SIZE);
  }

  const isFiltered =
    filters.country !== DEFAULT_FILTERS.country ||
    filters.major !== DEFAULT_FILTERS.major ||
    filters.budget !== DEFAULT_FILTERS.budget;

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        <FilterBar filters={filters} onChange={update} />

        <div className="mt-8 flex items-center justify-between">
          <p className="font-body text-sm text-sub">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "university" : "universities"} in{" "}
            <span className="font-semibold text-ink">{countryCount}</span>{" "}
            {countryCount === 1 ? "country" : "countries"} match your profile
          </p>
          {isFiltered && (
            <button
              type="button"
              onClick={() => update({ ...DEFAULT_FILTERS, cgpa: filters.cgpa })}
              className="font-body text-[13px] font-semibold text-ink underline underline-offset-4"
            >
              Reset filters
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <>
            <div className="mt-6 grid grid-cols-1 gap-4">
              {results.slice(0, visible).map(({ uni, match }) => (
                <UniversityCard
                  key={uni.id}
                  uni={uni}
                  match={match}
                  filters={filters}
                  onViewDetails={() => setSelected(uni)}
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
              No universities match those filters
            </p>
            <p className="mt-2 font-body text-sm text-sub">
              Try widening your budget or switching to &quot;All Countries&quot;.
            </p>
            <button
              type="button"
              onClick={() => update(DEFAULT_FILTERS)}
              className="mt-5 rounded-button bg-ink px-5 py-2.5 font-body text-sm font-semibold text-white"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {selected && (
        <UniversityDetailsModal
          uni={selected}
          match={computeMatch(selected, filters)}
          filters={filters}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
