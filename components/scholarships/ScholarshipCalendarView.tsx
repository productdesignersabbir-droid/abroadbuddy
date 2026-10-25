"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Scholarship } from "@/data/scholarships";
import { SCHOLARSHIPS } from "@/data/scholarships";
import {
  daysUntil,
  formatDate,
  formatDaysLeftLabel,
  formatMonthLabel,
  isClosingSoon,
  sortScholarshipsByDeadline,
  withUpcomingDeadlines,
} from "@/lib/scholarship-match";
import { IconChevronLeft, IconChevronRight } from "@/components/scholarships/icons";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function firstWeekdayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

/** Picks a sensible starting month: the earliest upcoming deadline in the full
 * dataset, or the earliest deadline overall if everything is already past. */
function defaultStartMonth() {
  const sorted = sortScholarshipsByDeadline(withUpcomingDeadlines(SCHOLARSHIPS));
  const upcoming = sorted.find((s) => daysUntil(s.deadline) >= 0) ?? sorted[0];
  const d = upcoming ? new Date(upcoming.deadline) : new Date();
  return { year: d.getFullYear(), month: d.getMonth() };
}

function ScholarshipRow({ scholarship }: { scholarship: Scholarship }) {
  const urgent = isClosingSoon(scholarship.deadline);
  return (
    <Link
      href={`/scholarships/${scholarship.id}`}
      className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 no-underline transition-colors duration-150 hover:bg-soft"
    >
      <div className="min-w-0">
        <p className="truncate font-body text-[13.5px] font-semibold text-ink">
          {scholarship.name}
        </p>
        <p className="mt-0.5 truncate font-body text-xs text-sub">
          {scholarship.provider} · {scholarship.country}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <span className="font-body text-xs text-sub">{formatDate(scholarship.deadline)}</span>
        <span
          className={`font-display text-[12.5px] font-bold ${urgent ? "text-red" : "text-ink"}`}
        >
          {formatDaysLeftLabel(scholarship.deadline)}
        </span>
      </div>
    </Link>
  );
}

export function ScholarshipCalendarView({ scholarships }: { scholarships: Scholarship[] }) {
  const [{ year, month }, setViewDate] = useState(defaultStartMonth);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const itemsByDay = useMemo(() => {
    const map = new Map<number, Scholarship[]>();
    for (const s of scholarships) {
      const d = new Date(s.deadline);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!map.has(day)) map.set(day, []);
        map.get(day)!.push(s);
      }
    }
    return map;
  }, [scholarships, year, month]);

  const monthItems = useMemo(
    () => sortScholarshipsByDeadline(Array.from(itemsByDay.values()).flat()),
    [itemsByDay]
  );

  const nearestMonthWithItems = useMemo(() => {
    if (scholarships.length === 0) return null;
    const sorted = sortScholarshipsByDeadline(scholarships);
    const upcoming = sorted.find((s) => {
      const d = new Date(s.deadline);
      return d.getFullYear() > year || (d.getFullYear() === year && d.getMonth() > month);
    });
    return upcoming ?? sorted[0];
  }, [scholarships, year, month]);

  function changeMonth(delta: number) {
    setSelectedDay(null);
    setViewDate((prev) => {
      const total = prev.year * 12 + prev.month + delta;
      return { year: Math.floor(total / 12), month: ((total % 12) + 12) % 12 };
    });
  }

  function jumpToItem(scholarship: Scholarship) {
    const d = new Date(scholarship.deadline);
    setViewDate({ year: d.getFullYear(), month: d.getMonth() });
    setSelectedDay(d.getDate());
  }

  const totalCells = firstWeekdayOfMonth(year, month) + daysInMonth(year, month);
  const gridCells = Math.ceil(totalCells / 7) * 7;
  const selectedItems = selectedDay !== null ? itemsByDay.get(selectedDay) ?? [] : monthItems;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-card bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
            className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors hover:bg-soft"
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
            className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors hover:bg-soft"
          >
            <IconChevronRight />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-2">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              className="py-1 text-center font-label text-[10px] uppercase tracking-[0.06em] text-sub"
            >
              {w}
            </div>
          ))}

          {Array.from({ length: gridCells }).map((_, i) => {
            const day = i - firstWeekdayOfMonth(year, month) + 1;
            if (day < 1 || day > daysInMonth(year, month)) {
              return <div key={i} aria-hidden />;
            }
            const items = itemsByDay.get(day);
            const isSelected = selectedDay === day;
            const hasItems = !!items && items.length > 0;

            return (
              <button
                key={i}
                type="button"
                disabled={!hasItems}
                onClick={() => setSelectedDay(isSelected ? null : day)}
                className={`relative aspect-square rounded-xl border text-left transition-colors ${
                  isSelected
                    ? "border-blue bg-blue/10"
                    : hasItems
                      ? "border-blue/25 bg-blue/5 hover:bg-blue/10"
                      : "border-line bg-soft/50"
                } ${hasItems ? "cursor-pointer" : "cursor-default"}`}
              >
                <span
                  className={`absolute left-1.5 top-1 font-body text-[11.5px] font-semibold ${
                    hasItems ? "text-ink" : "text-sub"
                  }`}
                >
                  {day}
                </span>
                {hasItems && (
                  <span className="absolute bottom-1 right-1 grid h-4 min-w-4 place-items-center rounded-full bg-blue px-1 font-label text-[9px] font-bold text-white">
                    {items!.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-4 font-body text-[12.5px] text-sub">
          Click a highlighted date to see what&apos;s due that day.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h4 className="font-label text-[11.5px] font-semibold uppercase tracking-[0.06em] text-sub">
            {selectedDay !== null
              ? `Due ${formatMonthLabel(year, month)} ${selectedDay}`
              : `This month's deadlines`}
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

        {selectedItems.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            {selectedItems.map((s) => (
              <ScholarshipRow key={s.id} scholarship={s} />
            ))}
          </div>
        ) : (
          <div className="rounded-card border border-dashed border-line bg-white px-5 py-8 text-center">
            <p className="font-body text-sm text-sub">
              No scholarship deadlines match your filters this month.
            </p>
            {nearestMonthWithItems && (
              <button
                type="button"
                onClick={() => jumpToItem(nearestMonthWithItems)}
                className="mt-4 rounded-button bg-blue px-4 py-2 font-body text-sm font-semibold text-white"
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
