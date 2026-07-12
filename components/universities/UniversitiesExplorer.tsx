"use client";

import { useMemo, useState } from "react";
import type { University } from "@/data/universities";
import {
  DEFAULT_FILTERS,
  computeMatch,
  passesHardFilters,
} from "@/lib/university-match";
import { FilterBar } from "@/components/universities/FilterBar";
import { UniversityCard } from "@/components/universities/UniversityCard";
import { UniversityDetailsModal } from "@/components/universities/UniversityDetailsModal";

export function UniversitiesExplorer({
  universities,
}: {
  universities: University[];
}) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selected, setSelected] = useState<University | null>(null);

  const results = useMemo(() => {
    return universities
      .filter((uni) => passesHardFilters(uni, filters))
      .map((uni) => ({ uni, match: computeMatch(uni, filters) }))
      .sort((a, b) => b.match - a.match || a.uni.worldRanking - b.uni.worldRanking);
  }, [universities, filters]);

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        <FilterBar filters={filters} onChange={setFilters} />

        <div className="mt-8 flex items-center justify-between">
          <p className="font-body text-sm text-sub">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "university" : "universities"} match your
            filters
          </p>
          {(filters.country !== DEFAULT_FILTERS.country ||
            filters.major !== DEFAULT_FILTERS.major ||
            filters.budget !== DEFAULT_FILTERS.budget) && (
            <button
              type="button"
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="font-label text-[11.5px] font-semibold uppercase tracking-[0.06em] text-blue"
            >
              Reset filters
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map(({ uni, match }) => (
              <UniversityCard
                key={uni.id}
                uni={uni}
                match={match}
                onViewDetails={() => setSelected(uni)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-card border border-dashed border-line bg-white px-6 py-14 text-center">
            <p className="font-display text-lg font-bold text-ink">
              No universities match those filters
            </p>
            <p className="mt-2 font-body text-sm text-sub">
              Try widening your budget or switching to &quot;All Countries&quot;.
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

      {selected && (
        <UniversityDetailsModal
          uni={selected}
          match={computeMatch(selected, filters)}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
