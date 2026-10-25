"use client";

import { useMemo, useState } from "react";
import type { Lab } from "@/data/labs";
import { DEFAULT_FILTERS, getOverallRating, passesLabFilters } from "@/lib/lab-match";
import { LabSearchFilterBar } from "@/components/lab-kemon/LabSearchFilterBar";
import { LabCard } from "@/components/lab-kemon/LabCard";
import { LabDetailsModal } from "@/components/lab-kemon/LabDetailsModal";

function countBy(labs: Lab[], key: (lab: Lab) => string) {
  const counts: Record<string, number> = {};
  for (const lab of labs) counts[key(lab)] = (counts[key(lab)] ?? 0) + 1;
  return counts;
}

export function LabsExplorer({ labs }: { labs: Lab[] }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selected, setSelected] = useState<Lab | null>(null);

  const countryCounts = useMemo(() => countBy(labs, (l) => l.country), [labs]);
  const fieldCounts = useMemo(() => countBy(labs, (l) => l.field), [labs]);

  const results = useMemo(() => {
    return labs
      .filter((lab) => passesLabFilters(lab, filters))
      .sort((a, b) => getOverallRating(b) - getOverallRating(a));
  }, [labs, filters]);

  const isFiltered =
    filters.search !== DEFAULT_FILTERS.search ||
    filters.country !== DEFAULT_FILTERS.country ||
    filters.field !== DEFAULT_FILTERS.field ||
    filters.openOnly !== DEFAULT_FILTERS.openOnly;

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        <LabSearchFilterBar
          filters={filters}
          onChange={setFilters}
          countryCounts={countryCounts}
          fieldCounts={fieldCounts}
        />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="font-body text-sm text-sub">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "professor" : "professors"} match your search
            <span className="hidden sm:inline">
              {" "}· {Object.keys(countryCounts).length} countries · {Object.keys(fieldCounts).length} fields
            </span>
          </p>
          {isFiltered && (
            <button
              type="button"
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="font-body text-[13px] font-semibold text-ink underline underline-offset-4"
            >
              Reset filters
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {results.map((lab) => (
              <LabCard key={lab.id} lab={lab} onReadReviews={() => setSelected(lab)} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-card border border-dashed border-line bg-white px-6 py-14 text-center">
            <p className="font-display text-[26px] leading-tight tracking-[-0.02em] text-ink">
              No professors match those filters
            </p>
            <p className="mt-2 font-body text-sm text-sub">
              Try a broader topic or switch to &quot;All Countries&quot;.
            </p>
            <button
              type="button"
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="mt-5 rounded-button bg-ink px-5 py-2.5 font-body text-sm font-semibold text-white"
            >
              Reset filters
            </button>
          </div>
        )}

        <p className="mt-10 text-center font-body text-[12.5px] text-sub">
          Sample profiles for the demo. Professor names, scores and reviews are placeholders until verified data is connected.
        </p>
      </div>

      {selected && <LabDetailsModal lab={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
