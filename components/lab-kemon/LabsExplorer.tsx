"use client";

import { useMemo, useState } from "react";
import type { Lab } from "@/data/labs";
import { DEFAULT_FILTERS, getOverallRating, passesLabFilters } from "@/lib/lab-match";
import { LabSearchFilterBar } from "@/components/lab-kemon/LabSearchFilterBar";
import { LabCard } from "@/components/lab-kemon/LabCard";
import { LabDetailsModal } from "@/components/lab-kemon/LabDetailsModal";

export function LabsExplorer({ labs }: { labs: Lab[] }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selected, setSelected] = useState<Lab | null>(null);

  const results = useMemo(() => {
    return labs
      .filter((lab) => passesLabFilters(lab, filters))
      .sort((a, b) => getOverallRating(b) - getOverallRating(a));
  }, [labs, filters]);

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        <LabSearchFilterBar filters={filters} onChange={setFilters} />

        <div className="mt-8 flex items-center justify-between">
          <p className="font-body text-sm text-sub">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "lab" : "labs"} match your search
          </p>
          {(filters.search !== DEFAULT_FILTERS.search ||
            filters.country !== DEFAULT_FILTERS.country ||
            filters.field !== DEFAULT_FILTERS.field) && (
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
            {results.map((lab) => (
              <LabCard
                key={lab.id}
                lab={lab}
                onReadReviews={() => setSelected(lab)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-card border border-dashed border-line bg-white px-6 py-14 text-center">
            <p className="font-display text-lg font-bold text-ink">
              No labs match those filters
            </p>
            <p className="mt-2 font-body text-sm text-sub">
              Try a different search term or switch to &quot;All Countries&quot;.
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
        <LabDetailsModal lab={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
