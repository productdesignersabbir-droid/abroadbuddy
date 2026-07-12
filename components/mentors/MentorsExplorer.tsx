"use client";

import { useMemo, useState } from "react";
import type { Mentor } from "@/data/mentors";
import {
  DEFAULT_FILTERS,
  passesMentorFilters,
} from "@/lib/mentor-match";
import { MentorFilterBar } from "@/components/mentors/MentorFilterBar";
import { MentorCard } from "@/components/mentors/MentorCard";
import { BookSessionModal } from "@/components/mentors/BookSessionModal";

export function MentorsExplorer({ mentors }: { mentors: Mentor[] }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selected, setSelected] = useState<Mentor | null>(null);

  const results = useMemo(() => {
    return mentors
      .filter((mentor) => passesMentorFilters(mentor, filters))
      .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  }, [mentors, filters]);

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        <MentorFilterBar filters={filters} onChange={setFilters} />

        <div className="mt-8 flex items-center justify-between">
          <p className="font-body text-sm text-sub">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "mentor" : "mentors"} match your filters
          </p>
          {(filters.sessionType !== DEFAULT_FILTERS.sessionType ||
            filters.country !== DEFAULT_FILTERS.country ||
            filters.field !== DEFAULT_FILTERS.field ||
            filters.maxPrice !== DEFAULT_FILTERS.maxPrice) && (
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
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onBook={() => setSelected(mentor)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-card border border-dashed border-line bg-white px-6 py-14 text-center">
            <p className="font-display text-lg font-bold text-ink">
              No mentors match those filters
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
        <BookSessionModal mentor={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
