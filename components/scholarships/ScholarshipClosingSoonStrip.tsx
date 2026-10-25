import Link from "next/link";
import type { Scholarship } from "@/data/scholarships";
import { daysUntil, formatDate, isClosingSoon } from "@/lib/scholarship-match";
import { IconClock } from "@/components/conferences/icons";

function DaysLeft({ deadline }: { deadline: string }) {
  const days = daysUntil(deadline);
  const color = isClosingSoon(deadline) ? "text-red" : "text-ink";
  if (days === 0) {
    return <span className={`font-display text-[28px] font-bold leading-none ${color}`}>Today</span>;
  }
  return (
    <span className="flex items-baseline gap-1.5">
      <span className={`font-display text-[34px] font-bold leading-none tracking-[-0.03em] ${color}`}>
        {days}
      </span>
      <span className={`font-label text-[11px] uppercase tracking-[0.08em] ${color}`}>
        {days === 1 ? "day left" : "days left"}
      </span>
    </span>
  );
}

export function ScholarshipClosingSoonStrip({
  scholarships,
}: {
  scholarships: Scholarship[];
}) {
  if (scholarships.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2">
        <IconClock />
        <h2 className="font-label text-[11.5px] font-semibold uppercase tracking-[0.08em] text-red">
          Next deadlines
        </h2>
      </div>

      {/* The next few deadlines, nearest first. Scrolls sideways on small screens. */}
      <ul className="-mx-6 mt-3.5 flex list-none snap-x gap-3 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {scholarships.map((scholarship) => (
          <li key={scholarship.id} className="w-64 shrink-0 snap-start sm:w-auto">
            <Link
              href={`/scholarships/${scholarship.id}`}
              className="flex h-full flex-col rounded-card border border-red/20 bg-white p-4.5 no-underline transition-colors duration-150 hover:bg-red/4"
            >
              <DaysLeft deadline={scholarship.deadline} />
              <p className="mt-3.5 font-body text-[15px] font-semibold leading-snug text-ink">
                {scholarship.name}
              </p>
              <p className="mt-auto pt-2.5 font-body text-[12.5px] text-sub">
                {scholarship.country} · Due {formatDate(scholarship.deadline)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
