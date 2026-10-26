"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { University } from "@/data/universities";
import {
  DEFAULT_FILTERS,
  computeMatch,
  passesHardFilters,
  sortResults,
  type FinderDegree,
  type UniversityFilters,
} from "@/lib/university-match";
import { FilterBar } from "@/components/universities/FilterBar";
import { UniversityCard } from "@/components/universities/UniversityCard";
import { UniversityDetailsModal } from "@/components/universities/UniversityDetailsModal";

const PAGE_SIZE = 10;

const GUIDANCE: Record<FinderDegree, { body: string; second: { href: string; label: string } }> = {
  bachelors: {
    body: "See which fields fit your HSC subjects, what each country asks for, and a month-by-month plan to your start date.",
    second: { href: "/mentoring", label: "Talk to a mentor" },
  },
  masters: {
    body: "Get a readiness score, a to-do list made for your plan and a month-by-month route to your intake.",
    second: { href: "/mentoring", label: "Talk to a mentor" },
  },
  phd: {
    body: "PhD places often come through a supervisor. Check your readiness, then find professors whose work fits yours.",
    second: { href: "/lab-kemon", label: "Find professors" },
  },
};

/** A free way in for students who aren't sure what to filter for yet. */
function GuidanceCard({ degree }: { degree: FinderDegree }) {
  const g = GUIDANCE[degree];
  return (
    <div className="mt-6 flex flex-col gap-4 border-l-4 border-blue bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-2xl">
        <p className="font-label text-[11px] font-semibold uppercase tracking-[0.08em] text-blue">Free guidance</p>
        <p className="mt-1 font-display text-[20px] leading-tight text-ink">Not sure where you fit?</p>
        <p className="mt-1 font-body text-[14px] leading-relaxed text-sub">{g.body}</p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">
        <Link
          href={`/readiness?degree=${degree}`}
          className="bg-blue px-4 py-2.5 font-body text-[14px] font-semibold text-white"
        >
          Free readiness check
        </Link>
        <Link
          href={g.second.href}
          className="border-[1.5px] border-line px-4 py-2.5 font-body text-[14px] font-semibold text-ink hover:border-ink/40"
        >
          {g.second.label}
        </Link>
      </div>
    </div>
  );
}

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
        <GuidanceCard degree={filters.degree} />

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
              onClick={() =>
                update({ ...DEFAULT_FILTERS, degree: filters.degree, cgpa: filters.cgpa, gpa: filters.gpa })
              }
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
              onClick={() => update({ ...DEFAULT_FILTERS, degree: filters.degree })}
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
