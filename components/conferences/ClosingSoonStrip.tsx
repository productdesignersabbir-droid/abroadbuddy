import type { Conference } from "@/data/conferences";
import { formatDaysLeftLabel } from "@/lib/conference-match";
import { IconClock, IconExternalLink } from "@/components/conferences/icons";

export function ClosingSoonStrip({ conferences }: { conferences: Conference[] }) {
  if (conferences.length === 0) return null;

  return (
    <div className="rounded-card border border-red/20 bg-red/6 p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <IconClock />
        <span className="font-label text-[11.5px] font-semibold uppercase tracking-[0.06em] text-red">
          Deadlines closing soon
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {conferences.map((conference) => (
          <a
            key={conference.id}
            href={conference.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 transition-colors duration-150 hover:bg-soft sm:min-w-70"
          >
            <div className="min-w-0">
              <p className="truncate font-body text-[13.5px] font-semibold text-ink">
                {conference.name}
              </p>
              <p className="mt-0.5 truncate font-body text-xs text-sub">
                {conference.host}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 font-body text-[13px] font-semibold text-red">
              {formatDaysLeftLabel(conference.deadline)}
              <IconExternalLink color="#FF3B47" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
