"use client";

import { useMemo, useState } from "react";
import { COACH_SESSION_TYPES, type Coach, type CoachSessionType, type ExamType } from "@/data/ielts";
import { IconMentor } from "@/components/home/icons";
import { CoachCard } from "@/components/ielts/CoachCard";
import { BookCoachModal } from "@/components/ielts/BookCoachModal";

const ALL_SESSION_TYPES = "All Session Types";

export function ExamCoachesSection({
  examType,
  coaches,
}: {
  examType: ExamType;
  coaches: Coach[];
}) {
  const [sessionType, setSessionType] = useState<string>(ALL_SESSION_TYPES);
  const [selected, setSelected] = useState<Coach | null>(null);

  const scoped = useMemo(
    () => coaches.filter((c) => c.examTypes.includes(examType)),
    [coaches, examType]
  );

  const results = useMemo(() => {
    return scoped
      .filter(
        (c) =>
          sessionType === ALL_SESSION_TYPES ||
          c.sessionTypes.includes(sessionType as CoachSessionType)
      )
      .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  }, [scoped, sessionType]);

  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-blue/10">
          <IconMentor color="#1E4FFF" />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-ink">
            Hire a {examType} coach
          </h2>
          <p className="font-body text-[13px] text-sub">
            Book 1:1 or group sessions with vetted {examType} specialists.
          </p>
        </div>
      </div>

      {scoped.length > 1 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {[ALL_SESSION_TYPES, ...COACH_SESSION_TYPES].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSessionType(type)}
              className={`rounded-button border-[1.5px] px-3.5 py-2.5 font-body text-sm font-semibold transition-colors ${
                sessionType === type
                  ? "border-blue bg-blue/5 text-blue"
                  : "border-line text-ink"
              }`}
            >
              {type === "1:1" ? "1:1 session" : type === "Group" ? "Group session" : type}
            </button>
          ))}
        </div>
      )}

      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((coach) => (
            <CoachCard key={coach.id} coach={coach} onBook={() => setSelected(coach)} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-card border border-dashed border-line bg-white px-6 py-14 text-center">
          <p className="font-display text-lg font-bold text-ink">
            No coaches match that filter
          </p>
          <p className="mt-2 font-body text-sm text-sub">
            Try switching to &quot;All Session Types&quot;.
          </p>
        </div>
      )}

      {selected && <BookCoachModal coach={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
