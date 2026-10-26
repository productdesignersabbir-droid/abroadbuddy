"use client";

import { useState } from "react";
import { MENTORS, type Mentor } from "@/data/mentors";
import { RESEARCH_MENTORS } from "@/data/research-mentors";
import { MentorCard } from "@/components/mentors/MentorCard";
import { BookSessionModal } from "@/components/mentors/BookSessionModal";
import { ResearchMentorCard } from "@/components/research-mentoring/ResearchMentorCard";

export type MentoringType = "study" | "research";

const KINDS: Record<MentoringType, { label: string; title: string; body: string; points: string[] }> = {
  study: {
    label: "Higher-study mentoring",
    title: "A clearer application plan",
    body: "Talk to Bangladeshi students and alumni abroad about where to apply, how to fund it, your documents and interviews.",
    points: [
      "Bring your goals and one decision you're stuck on",
      "Agree a realistic shortlist and order to apply",
      "Leave with the documents and rules to check next",
    ],
  },
  research: {
    label: "Research mentoring",
    title: "Research with a clear purpose",
    body: "One-to-one help to shape your question, choose methods, build your proposal and explain your work.",
    points: [
      "Talk through your question and what to read",
      "Get feedback on methods or your proposal",
      "Agree the next milestones together",
    ],
  },
};

const byRating = <T extends { rating: number; reviewCount: number }>(list: T[]) =>
  [...list].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);

export function MentoringExplorer({ initialType = "study" }: { initialType?: MentoringType }) {
  const [type, setType] = useState<MentoringType>(initialType);
  const [booking, setBooking] = useState<Mentor | null>(null);
  const kind = KINDS[type];

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div role="tablist" aria-label="Type of mentoring" className="grid grid-cols-2 gap-2 sm:w-fit">
          {(Object.keys(KINDS) as MentoringType[]).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={type === t}
              onClick={() => setType(t)}
              className={`px-5 py-3 font-body text-[15px] font-semibold transition-colors ${
                type === t ? "bg-blue text-white" : "bg-white text-ink hover:bg-white/70"
              }`}
            >
              {KINDS[t].label}
            </button>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 bg-white p-6 sm:p-7 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="font-display text-[28px] leading-tight text-ink">{kind.title}</p>
            <p className="mt-2 max-w-md font-body text-[15px] leading-relaxed text-sub">{kind.body}</p>
          </div>
          <ol className="flex list-none flex-col gap-3 p-0">
            {kind.points.map((p, i) => (
              <li key={p} className="flex items-start gap-3 border-t border-line pt-3 font-body text-[15px] text-ink">
                <span className="font-label text-[12px] text-blue">{String(i + 1).padStart(2, "0")}</span>
                {p}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex items-baseline justify-between">
          <h2 className="font-display text-[26px] text-ink">Meet the mentors</h2>
          <p className="font-body text-[13px] text-sub">Paid sessions · price per session</p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {type === "study"
            ? byRating(MENTORS).map((m) => <MentorCard key={m.id} mentor={m} onBook={() => setBooking(m)} />)
            : byRating(RESEARCH_MENTORS).map((m) => <ResearchMentorCard key={m.id} mentor={m} />)}
        </div>

        <p className="mt-6 max-w-3xl font-body text-[12.5px] leading-relaxed text-sub">
          Before you pay, confirm the session length, what you&apos;ll get and the cancellation terms. No mentor
          can guarantee an admission, scholarship or visa.
        </p>
      </div>

      {booking && <BookSessionModal mentor={booking} onClose={() => setBooking(null)} />}
    </section>
  );
}
