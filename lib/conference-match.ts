import type { Conference } from "@/data/conferences";

export type ConferenceFilters = {
  query: string;
  field: string;
  location: string;
  type: string;
  /** Hide events whose deadline has already passed. */
  openOnly: boolean;
};

export type SortMode = "eventDate" | "deadline";

export const ALL_FIELDS = "All Fields";
export const ALL_LOCATIONS = "All Locations";
export const ALL_TYPES = "All Types";

export const DEFAULT_FILTERS: ConferenceFilters = {
  query: "",
  field: ALL_FIELDS,
  location: ALL_LOCATIONS,
  type: ALL_TYPES,
  openOnly: false,
};

export const DEFAULT_SORT: SortMode = "deadline";

/** Deadlines within this many days are called out as "closing soon". */
export const CLOSING_SOON_DAYS = 14;

export function passesConferenceFilters(
  conference: Conference,
  filters: ConferenceFilters
) {
  const fieldOk =
    filters.field === ALL_FIELDS || conference.fields.includes(filters.field as never);
  const locationOk =
    filters.location === ALL_LOCATIONS || conference.locationType === filters.location;
  const typeOk = filters.type === ALL_TYPES || conference.type === filters.type;
  const openOk = !filters.openOnly || daysUntil(conference.deadline) >= 0;
  const q = filters.query.trim().toLowerCase();
  const queryOk =
    !q ||
    [conference.name, conference.host, conference.city, ...conference.fields].some((t) =>
      t.toLowerCase().includes(q)
    );
  return fieldOk && locationOk && typeOk && openOk && queryOk;
}

export function sortConferences(conferences: Conference[], sort: SortMode) {
  return [...conferences].sort((a, b) => {
    const key = sort === "deadline" ? "deadline" : "eventDate";
    return new Date(a[key]).getTime() - new Date(b[key]).getTime();
  });
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/** Whole calendar days between today and the given ISO date (can be negative if past). */
export function daysUntil(dateIso: string) {
  const target = new Date(dateIso);
  const targetMidnight = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((targetMidnight.getTime() - startOfToday().getTime()) / msPerDay);
}

export function isClosingSoon(dateIso: string) {
  const days = daysUntil(dateIso);
  return days >= 0 && days <= CLOSING_SOON_DAYS;
}

export function formatDaysLeftLabel(dateIso: string) {
  const days = daysUntil(dateIso);
  if (days < 0) return "Deadline passed";
  if (days === 0) return "Due today";
  if (days === 1) return "1 day left";
  return `${days} days left`;
}

export function formatDate(dateIso: string) {
  return new Date(dateIso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Formats an event date range, e.g. "Dec 19–21, 2026" or "Dec 19, 2026" if single-day. */
export function formatEventRange(startIso: string, endIso?: string) {
  if (!endIso || endIso === startIso) return formatDate(startIso);

  const start = new Date(startIso);
  const end = new Date(endIso);
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

  if (sameMonth) {
    const startDay = start.toLocaleDateString("en-US", { day: "numeric" });
    const endLabel = end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const monthLabel = start.toLocaleDateString("en-US", { month: "short" });
    return `${monthLabel} ${startDay}–${endLabel.replace(`${monthLabel} `, "")}`;
  }

  return `${formatDate(startIso)} – ${formatDate(endIso)}`;
}
