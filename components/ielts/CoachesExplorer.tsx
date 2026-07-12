"use client";

import { useMemo, useState } from "react";
import type { Coach } from "@/data/ielts";
import { DEFAULT_COACH_FILTERS, passesCoachFilters } from "@/lib/ielts-match";
import { IconMentor } from "@/components/home/icons";
import { CoachFilterBar } from "@/components/ielts/CoachFilterBar";
import { CoachCard } from "@/components/ielts/CoachCard";
import { BookCoachModal } from "@/components/ielts/BookCoachModal";

export function CoachesExplorer({ coaches }: { coaches: Coach[] }) {
  const [filters, setFilters] = useState(DEFAULT_COACH_FILTERS);
  const [selected, setSelected] = useState<Coach | null>(null);

  const results = useMemo(() => {
    return coaches
      .filter((coach) => passesCoachFilters(coach, filters))
      .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  }, [coaches, filters]);

  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-blue/10">
          <IconMentor color="#1E4FFF" />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-ink">Hire an expert coach</h2>
          <p className="font-body text-[13px] text-sub">
            Book 1:1 or group sessions for IELTS, GRE and TOEFL prep.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <CoachFilterBar filters={filters} onChange={setFilters} />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="font-body text-sm text-sub">
          <span className="font-semibold text-ink">{results.length}</span>{" "}
          {results.length === 1 ? "coach" : "coaches"} match your filters
        </p>
        {(filters.examType !== DEFAULT_COACH_FILTERS.examType ||
          filters.sessionType !== DEFAULT_COACH_FILTERS.sessionType) && (
          <button
            type="button"
            onClick={() => setFilters(DEFAULT_COACH_FILTERS)}
            className="font-label text-[11.5px] font-semibold uppercase tracking-[0.06em] text-blue"
          >
            Reset filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((coach) => (
            <CoachCard key={coach.id} coach={coach} onBook={() => setSelected(coach)} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-card border border-dashed border-line bg-white px-6 py-14 text-center">
          <p className="font-display text-lg font-bold text-ink">
            No coaches match those filters
          </p>
          <p className="mt-2 font-body text-sm text-sub">
            Try switching to &quot;All Exams&quot; or &quot;All Session Types&quot;.
          </p>
          <button
            type="button"
            onClick={() => setFilters(DEFAULT_COACH_FILTERS)}
            className="mt-5 rounded-button bg-blue px-5 py-2.5 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)]"
          >
            Reset filters
          </button>
        </div>
      )}

      {selected && <BookCoachModal coach={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
