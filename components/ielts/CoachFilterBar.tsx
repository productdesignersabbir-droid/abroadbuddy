"use client";

import { COACH_SESSION_TYPES, EXAM_TYPES } from "@/data/ielts";
import { ALL_COACH_SESSION_TYPES, ALL_EXAM_TYPES, type CoachFilters } from "@/lib/ielts-match";

const fieldLabel = "font-label text-[11px] uppercase tracking-[0.08em] text-sub";
const selectClass =
  "mt-2 w-full rounded-button border-[1.5px] border-line bg-white px-3.5 py-2.5 font-body text-sm font-medium text-ink transition-colors focus-visible:border-blue";

export function CoachFilterBar({
  filters,
  onChange,
}: {
  filters: CoachFilters;
  onChange: (next: CoachFilters) => void;
}) {
  return (
    <div className="rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] sm:p-6.5">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="examType" className={fieldLabel}>
            Exam type
          </label>
          <select
            id="examType"
            value={filters.examType}
            onChange={(e) => onChange({ ...filters, examType: e.target.value })}
            className={selectClass}
          >
            <option>{ALL_EXAM_TYPES}</option>
            {EXAM_TYPES.map((exam) => (
              <option key={exam}>{exam}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="coachSessionType" className={fieldLabel}>
            Session type
          </label>
          <select
            id="coachSessionType"
            value={filters.sessionType}
            onChange={(e) => onChange({ ...filters, sessionType: e.target.value })}
            className={selectClass}
          >
            <option>{ALL_COACH_SESSION_TYPES}</option>
            {COACH_SESSION_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
