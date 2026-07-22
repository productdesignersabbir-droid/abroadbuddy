import Link from "next/link";
import type { Scholarship } from "@/data/scholarships";
import { formatDate, formatDaysLeftLabel, isClosingSoon } from "@/lib/scholarship-match";
import { IconCap, IconCoins } from "@/components/scholarships/icons";

const FUNDING_STYLES: Record<Scholarship["fundingType"], string> = {
  "Fully Funded": "bg-blue/10 text-blue",
  "Partially Funded": "bg-red/10 text-red",
  "Tuition Waiver": "bg-ink/8 text-ink",
};

export function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  const urgent = isClosingSoon(scholarship.deadline);

  return (
    <div className="flex flex-col gap-5 rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] transition-shadow duration-200 hover:shadow-[0_18px_40px_-18px_rgba(11,18,32,0.22)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-pill px-2.5 py-1 font-label text-[10.5px] font-semibold tracking-[0.04em] ${FUNDING_STYLES[scholarship.fundingType]}`}
          >
            {scholarship.fundingType.toUpperCase()}
          </span>
          <span className="rounded-pill border border-line bg-soft px-2.5 py-1 font-label text-[10.5px] font-semibold tracking-[0.04em] text-sub">
            {scholarship.country.toUpperCase()}
          </span>
        </div>

        <h3 className="mt-3 font-display text-base font-bold leading-snug text-ink">
          {scholarship.name}
        </h3>
        <p className="mt-0.5 font-body text-[13px] text-sub">{scholarship.provider}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {scholarship.degreeLevels.map((level) => (
            <span
              key={level}
              className="rounded-pill border border-line bg-soft px-2.5 py-1 font-body text-[11.5px] font-medium text-ink"
            >
              {level}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 font-body text-[13px] text-sub">
          <span className="inline-flex items-center gap-1.5">
            <IconCap />
            Min. CGPA {scholarship.minCgpa.toFixed(2)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconCoins />
            {scholarship.amount}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-stretch gap-3 sm:w-45">
        <div
          className={`rounded-xl border px-4 py-3 text-center ${
            urgent ? "border-red/25 bg-red/8" : "border-line bg-soft"
          }`}
        >
          <div className="font-label text-[10.5px] uppercase tracking-[0.06em] text-sub">
            Deadline
          </div>
          <div className="mt-1 font-body text-sm font-semibold text-ink">
            {formatDate(scholarship.deadline)}
          </div>
          <div
            className={`mt-1 font-display text-sm font-bold ${urgent ? "text-red" : "text-ink"}`}
          >
            {formatDaysLeftLabel(scholarship.deadline)}
          </div>
        </div>

        <Link
          href={`/scholarships/${scholarship.id}`}
          className="inline-flex items-center justify-center gap-1.5 rounded-button bg-blue px-4 py-2.5 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
        >
          View details
        </Link>
      </div>
    </div>
  );
}
