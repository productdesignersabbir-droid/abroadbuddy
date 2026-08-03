"use client";

import { useMemo, useState } from "react";
import type { ResearchMentor } from "@/data/research-mentors";
import {
  DEFAULT_FILTERS,
  passesResearchMentorFilters,
  sortResearchMentors,
} from "@/lib/research-mentor-match";
import { ResearchMentorFilterBar } from "@/components/research-mentoring/ResearchMentorFilterBar";
import { ResearchMentorCard } from "@/components/research-mentoring/ResearchMentorCard";

export function ResearchMentorsExplorer({ mentors }: { mentors: ResearchMentor[] }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const results = useMemo(() => {
    const filtered = mentors.filter((m) => passesResearchMentorFilters(m, filters));
    return sortResearchMentors(filtered, filters.sort);
  }, [mentors, filters]);

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        <ResearchMentorFilterBar filters={filters} onChange={setFilters} />

        <div className="mt-8 flex items-center justify-between">
          <p className="font-body text-sm text-sub">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "mentor" : "mentors"} match your filters
          </p>
          {(filters.category !== DEFAULT_FILTERS.category ||
            filters.interest !== DEFAULT_FILTERS.interest ||
            filters.sort !== DEFAULT_FILTERS.sort) && (
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
            {results.map((mentor) => (
              <ResearchMentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-card border border-dashed border-line bg-white px-6 py-14 text-center">
            <p className="font-display text-lg font-bold text-ink">
              No mentors match those filters
            </p>
            <p className="mt-2 font-body text-sm text-sub">
              Try a different category or switch to &quot;All Interests&quot;.
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
