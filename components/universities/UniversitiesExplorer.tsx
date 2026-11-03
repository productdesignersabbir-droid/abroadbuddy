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

  // With no exact match, loosen one filter at a time so the student still sees
  // the nearest options: the same subject anywhere, then anything in the
  // country, then the same picks over budget.
  const nearest = useMemo(() => {
    if (results.length > 0) return null;
    const { country, major, budget } = DEFAULT_FILTERS;
    const tries: { note: string; next: UniversityFilters; when: boolean }[] = [
      { note: `${filters.major} in other countries`, next: { ...filters, country }, when: filters.country !== country },
      { note: `other subjects in ${filters.country}`, next: { ...filters, major }, when: filters.major !== major },
      { note: "the same picks over your budget", next: { ...filters, budget }, when: filters.budget !== budget },
      { note: "any subject, any country", next: { ...filters, country, major, budget }, when: true },
    ];
    for (const t of tries.filter((t) => t.when)) {
      const found = universities
        .filter((uni) => passesHardFilters(uni, t.next))
        .map((uni) => ({ uni, match: computeMatch(uni, filters) }));
      if (found.length > 0) return { ...t, results: sortResults(found, filters.sort).slice(0, PAGE_SIZE) };
    }
    return null;
  }, [results.length, universities, filters]);

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
            <span className="font-semibold text-ink">{results.length.toLocaleString("en-US")}</span>{" "}
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
              {nearest ? "Here are the closest ones instead." : "Try widening your budget or switching to \"All Countries\"."}
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

        {nearest && (
          <div className="mt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-display text-[22px] leading-tight text-ink">Closest options: {nearest.note}</p>
              <button
                type="button"
                onClick={() => update(nearest.next)}
                className="font-body text-[13px] font-semibold text-blue underline underline-offset-4"
              >
                Use these filters
              </button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {nearest.results.map(({ uni, match }) => (
                <UniversityCard
                  key={uni.id}
                  uni={uni}
                  match={match}
                  filters={nearest.next}
                  onViewDetails={() => setSelected(uni)}
                />
              ))}
            </div>
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
