import Link from "next/link";
import type { Scholarship } from "@/data/scholarships";
import { formatDaysLeftLabel } from "@/lib/scholarship-match";
import { IconClock } from "@/components/conferences/icons";

export function ScholarshipClosingSoonStrip({
  scholarships,
}: {
  scholarships: Scholarship[];
}) {
  if (scholarships.length === 0) return null;

  return (
    <div className="rounded-card border border-red/20 bg-red/6 p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <IconClock />
        <span className="font-label text-[11.5px] font-semibold uppercase tracking-[0.06em] text-red">
          Deadlines closing soon
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {scholarships.map((scholarship) => (
          <Link
            key={scholarship.id}
            href={`/scholarships/${scholarship.id}`}
            className="flex flex-1 items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 no-underline transition-shadow duration-150 hover:shadow-[0_10px_24px_-12px_rgba(11,18,32,0.2)] sm:min-w-70"
          >
            <div className="min-w-0">
              <p className="truncate font-body text-[13.5px] font-semibold text-ink">
                {scholarship.name}
              </p>
              <p className="mt-0.5 truncate font-body text-xs text-sub">
                {scholarship.provider}
              </p>
            </div>
            <div className="shrink-0 font-display text-[13px] font-bold text-red">
              {formatDaysLeftLabel(scholarship.deadline)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
