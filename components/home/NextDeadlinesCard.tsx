"use client";

import Link from "next/link";
import { useMemo } from "react";
import { SCHOLARSHIPS, type ScholarshipCountry } from "@/data/scholarships";
import {
  formatDaysLeftLabel,
  isClosingSoon,
  sortScholarshipsByDeadline,
  withUpcomingDeadlines,
} from "@/lib/scholarship-match";

const FLAGS: Record<ScholarshipCountry, string> = {
  USA: "🇺🇸",
  UK: "🇬🇧",
  Canada: "🇨🇦",
  Germany: "🇩🇪",
  Australia: "🇦🇺",
  "Multiple Countries": "🌍",
};

/** Hero card: a boarding-pass style ticket listing the next real deadlines. */
export function NextDeadlinesCard() {
  const next = useMemo(
    () => sortScholarshipsByDeadline(withUpcomingDeadlines(SCHOLARSHIPS)).slice(0, 4),
    []
  );

  return (
    <div className="relative mx-auto w-full max-w-110 animate-ticket" style={{ animationDelay: "450ms" }}>
      <div className="animate-float" style={{ animationDelay: "1.6s" }}>
      <div className="relative overflow-hidden rounded-t-[28px] bg-ink px-7 pb-8 pt-7 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 animate-drift rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, rgba(30,79,255,0.75), transparent 65%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 animate-drift rounded-full blur-2xl"
          style={{ animationDelay: "-6s", background: "radial-gradient(circle, rgba(255,59,71,0.55), transparent 65%)" }}
        />
        <div className="relative flex items-start justify-between">
          <div>
            <div className="font-display text-[52px] leading-none tracking-[-0.04em]">
              DAC <span className="inline-block animate-fly text-white/50">→</span> <span className="italic">Abroad</span>
            </div>
            <p className="mt-3 font-body text-[14px] text-white/70">Your boarding pass to study abroad</p>
          </div>
          <span className="rounded-[8px] bg-white/12 px-2.5 py-1 font-body text-[12px] text-white/85">
            Free
          </span>
        </div>
      </div>

      {/* Perforation between the two halves of the ticket. */}
      <div aria-hidden className="relative h-0">
        <div className="absolute inset-x-5 -top-px border-t-2 border-dashed border-white/25" />
        <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-paper" />
        <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-paper" />
      </div>

      <div className="rounded-b-[28px] border border-t-0 border-line bg-white px-5 pb-5 pt-5">
        <div className="flex items-center justify-between px-2 font-body text-[13px] text-sub">
          <span>Next scholarship deadlines</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-red" /> Live
          </span>
        </div>
        <ul className="mt-3 grid list-none grid-cols-1 gap-1.5 p-0">
          {next.map((s, i) => (
            <li key={s.id} className="animate-rise" style={{ animationDelay: `${900 + i * 120}ms` }}>
              <Link
                href={`/scholarships/${s.id}`}
                className="flex items-center gap-3 rounded-[16px] px-2 py-2.5 no-underline transition-colors hover:bg-soft"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-soft text-[20px]">
                  {FLAGS[s.country]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-body text-[15px] text-ink">{s.name}</span>
                  <span className="block font-body text-[13px] text-sub">{s.country}</span>
                </span>
                <span
                  className={`shrink-0 rounded-pill px-2.5 py-1 font-body text-[12.5px] ${
                    isClosingSoon(s.deadline) ? "bg-red/10 text-red" : "bg-blue/8 text-blue"
                  }`}
                >
                  {formatDaysLeftLabel(s.deadline)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
}
