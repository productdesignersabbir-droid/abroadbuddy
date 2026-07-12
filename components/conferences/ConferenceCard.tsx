import type { Conference } from "@/data/conferences";
import {
  formatDaysLeftLabel,
  formatDate,
  formatEventRange,
  isClosingSoon,
} from "@/lib/conference-match";
import { IconClock, IconExternalLink, IconPin } from "@/components/conferences/icons";
import { IconCal, IconVideo } from "@/components/home/icons";

const TYPE_STYLES: Record<Conference["type"], string> = {
  Conference: "bg-blue/10 text-blue",
  "Research Fest": "bg-red/10 text-red",
  "Paper Deadline": "bg-ink/8 text-ink",
};

export function ConferenceCard({ conference }: { conference: Conference }) {
  const urgent = isClosingSoon(conference.deadline);
  const isPaperDeadline = conference.type === "Paper Deadline";

  return (
    <div className="flex flex-col gap-5 rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] transition-shadow duration-200 hover:shadow-[0_18px_40px_-18px_rgba(11,18,32,0.22)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-pill px-2.5 py-1 font-label text-[10.5px] font-semibold tracking-[0.04em] ${TYPE_STYLES[conference.type]}`}
          >
            {conference.type.toUpperCase()}
          </span>
          <span className="rounded-pill border border-line bg-soft px-2.5 py-1 font-label text-[10.5px] font-semibold tracking-[0.04em] text-sub">
            {conference.format.toUpperCase()}
          </span>
        </div>

        <h3 className="mt-3 font-display text-base font-bold leading-snug text-ink">
          {conference.name}
        </h3>
        <p className="mt-0.5 font-body text-[13px] text-sub">{conference.host}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {conference.fields.map((field) => (
            <span
              key={field}
              className="rounded-pill border border-line bg-soft px-2.5 py-1 font-body text-[11.5px] font-medium text-ink"
            >
              {field}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 font-body text-[13px] text-sub">
          <span className="inline-flex items-center gap-1.5">
            <IconPin />
            {conference.city}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconVideo color="#5A6577" />
            {conference.format}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconCal color="#5A6577" />
            {isPaperDeadline ? "Results / publication: " : ""}
            {formatEventRange(conference.eventDate, conference.eventEndDate)}
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
            {isPaperDeadline ? "Submission deadline" : "Paper deadline"}
          </div>
          <div className="mt-1 font-body text-sm font-semibold text-ink">
            {formatDate(conference.deadline)}
          </div>
          <div
            className={`mt-1 inline-flex items-center gap-1.5 font-display text-sm font-bold ${
              urgent ? "text-red" : "text-ink"
            }`}
          >
            {urgent && <IconClock />}
            {formatDaysLeftLabel(conference.deadline)}
          </div>
        </div>

        <a
          href={conference.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-button bg-blue px-4 py-2.5 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
        >
          Visit site
          <IconExternalLink color="#FFFFFF" />
        </a>
      </div>
    </div>
  );
}
