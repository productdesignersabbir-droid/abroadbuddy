"use client";

import { useMemo, useState } from "react";
import type { Conference } from "@/data/conferences";
import {
  daysUntil,
  formatDate,
  formatDaysLeftLabel,
  isClosingSoon,
  sortConferences,
} from "@/lib/conference-match";
import { formatMonthLabel } from "@/lib/scholarship-match";
import { IconChevronLeft, IconChevronRight } from "@/components/scholarships/icons";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const firstWeekday = (year: number, month: number) => new Date(year, month, 1).getDay();

type Kind = "deadline" | "event";

/** Start on the month of the next open deadline, or today's month. */
function startMonth(conferences: Conference[]) {
  const next = sortConferences(conferences, "deadline").find((c) => daysUntil(c.deadline) >= 0);
  const d = next ? new Date(next.deadline) : new Date();
  return { year: d.getFullYear(), month: d.getMonth() };
}

function Row({
  conference,
  kind,
  onOpen,
}: {
  conference: Conference;
  kind: Kind;
  onOpen: () => void;
}) {
  const urgent = kind === "deadline" && isClosingSoon(conference.deadline);
  const date = kind === "deadline" ? conference.deadline : conference.eventDate;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center justify-between gap-3 border border-line bg-white px-4 py-3 text-left transition-colors duration-150 hover:bg-soft"
    >
      <div className="min-w-0">
        <p className="truncate font-body text-[13.5px] font-semibold text-ink">{conference.name}</p>
        <p className="mt-0.5 truncate font-body text-xs text-sub">
          {kind === "deadline" ? "Submission deadline" : "Event"} · {conference.city}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <span className="font-body text-xs text-sub">{formatDate(date)}</span>
        {kind === "deadline" && (
          <span className={`font-display text-[12.5px] font-bold ${urgent ? "text-red" : "text-ink"}`}>
            {formatDaysLeftLabel(conference.deadline)}
          </span>
        )}
      </div>
    </button>
  );
}

/** Month grid of submission deadlines and event dates; click a day to list them. */
export function ConferenceCalendarView({
  conferences,
  onOpen,
}: {
  conferences: Conference[];
  onOpen: (c: Conference) => void;
}) {
  const [{ year, month }, setView] = useState(() => startMonth(conferences));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const byDay = useMemo(() => {
    const map = new Map<number, { conference: Conference; kind: Kind }[]>();
    const add = (iso: string, conference: Conference, kind: Kind) => {
      const d = new Date(iso);
      if (d.getFullYear() !== year || d.getMonth() !== month) return;
      const list = map.get(d.getDate()) ?? [];
      list.push({ conference, kind });
      map.set(d.getDate(), list);
    };
    for (const c of conferences) {
      add(c.deadline, c, "deadline");
      add(c.eventDate, c, "event");
    }
    return map;
  }, [conferences, year, month]);

  const monthItems = useMemo(
    () =>
      Array.from(byDay.entries())
        .sort(([a], [b]) => a - b)
        .flatMap(([, items]) => items),
    [byDay]
  );

  function changeMonth(delta: number) {
    setSelectedDay(null);
    setView((prev) => {
      const total = prev.year * 12 + prev.month + delta;
      return { year: Math.floor(total / 12), month: ((total % 12) + 12) % 12 };
    });
  }

  const nextWithItems = useMemo(() => {
    const later = sortConferences(conferences, "deadline").find((c) => {
      const d = new Date(c.deadline);
      return d.getFullYear() > year || (d.getFullYear() === year && d.getMonth() > month);
    });
    return later ?? null;
  }, [conferences, year, month]);

  const lead = firstWeekday(year, month);
  const cells = Math.ceil((lead + daysInMonth(year, month)) / 7) * 7;
  const shown = selectedDay !== null ? byDay.get(selectedDay) ?? [] : monthItems;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
            className="grid h-9 w-9 place-items-center border border-line transition-colors hover:bg-soft"
          >
            <IconChevronLeft />
          </button>
          <h3 className="font-display text-[26px] leading-tight tracking-[-0.02em] text-ink">
            {formatMonthLabel(year, month)}
          </h3>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            aria-label="Next month"
            className="grid h-9 w-9 place-items-center border border-line transition-colors hover:bg-soft"
          >
            <IconChevronRight />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-2">
          {WEEKDAYS.map((w) => (
            <div key={w} className="py-1 text-center font-label text-[10px] uppercase tracking-[0.06em] text-sub">
              {w}
            </div>
          ))}
          {Array.from({ length: cells }).map((_, i) => {
            const day = i - lead + 1;
            if (day < 1 || day > daysInMonth(year, month)) return <div key={i} aria-hidden />;
            const items = byDay.get(day) ?? [];
            const deadlines = items.filter((x) => x.kind === "deadline").length;
            const events = items.length - deadlines;
            const selected = selectedDay === day;
            return (
              <button
                key={i}
                type="button"
                disabled={!items.length}
                onClick={() => setSelectedDay(selected ? null : day)}
                aria-label={`${formatMonthLabel(year, month)} ${day}: ${deadlines} deadlines, ${events} events`}
                className={`relative aspect-square border text-left transition-colors ${
                  selected
                    ? "border-blue bg-blue/10"
                    : items.length
                      ? "cursor-pointer border-blue/25 bg-blue/5 hover:bg-blue/10"
                      : "cursor-default border-line bg-soft/50"
                }`}
              >
                <span
                  className={`absolute left-1.5 top-1 font-body text-[11.5px] font-semibold ${
                    items.length ? "text-ink" : "text-sub"
                  }`}
                >
                  {day}
                </span>
                <span className="absolute bottom-1 right-1 flex gap-0.5">
                  {events > 0 && (
                    <span className="grid h-4 min-w-4 place-items-center bg-red px-1 font-label text-[9px] font-bold text-white">
                      {events}
                    </span>
                  )}
                  {deadlines > 0 && (
                    <span className="grid h-4 min-w-4 place-items-center bg-blue px-1 font-label text-[9px] font-bold text-white">
                      {deadlines}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 font-body text-[12.5px] text-sub">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 bg-blue" aria-hidden /> Submission deadline
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 bg-red" aria-hidden /> Event
          </span>
          <span>Click a highlighted date to see what&apos;s on.</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h4 className="font-label text-[11.5px] font-semibold uppercase tracking-[0.06em] text-sub">
            {selectedDay !== null ? `${formatMonthLabel(year, month)} ${selectedDay}` : "This month"}
          </h4>
          {selectedDay !== null && (
            <button
              type="button"
              onClick={() => setSelectedDay(null)}
              className="font-label text-[11px] font-semibold uppercase tracking-[0.06em] text-blue"
            >
              Clear
            </button>
          )}
        </div>
        {shown.length > 0 ? (
          <div className="flex max-h-[520px] flex-col gap-2.5 overflow-y-auto">
            {shown.map(({ conference, kind }) => (
              <Row
                key={`${conference.id}-${kind}`}
                conference={conference}
                kind={kind}
                onOpen={() => onOpen(conference)}
              />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-line bg-white px-5 py-8 text-center">
            <p className="font-body text-sm text-sub">No deadlines or events match your filters this month.</p>
            {nextWithItems && (
              <button
                type="button"
                onClick={() => {
                  const d = new Date(nextWithItems.deadline);
                  setView({ year: d.getFullYear(), month: d.getMonth() });
                  setSelectedDay(d.getDate());
                }}
                className="mt-4 bg-blue px-4 py-2 font-body text-sm font-semibold text-white"
              >
                Jump to next deadline
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
