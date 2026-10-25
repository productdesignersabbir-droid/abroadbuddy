import {
  SCHOLARSHIPS,
  type Scholarship,
  type ScholarshipCountry,
} from "@/data/scholarships";

export type ScholarshipFilters = {
  country: string;
  region: string;
  degreeLevel: string;
  fundingType: string;
  cgpa: number;
  closingSoonOnly: boolean;
};

export const ALL_COUNTRIES = "All Countries";
export const ALL_REGIONS = "All Regions";
export const ALL_DEGREE_LEVELS = "All Levels";
export const ALL_FUNDING_TYPES = "All Funding Types";

export const MIN_CGPA = 2;
export const MAX_CGPA = 4;

export const DEFAULT_FILTERS: ScholarshipFilters = {
  country: ALL_COUNTRIES,
  region: ALL_REGIONS,
  degreeLevel: ALL_DEGREE_LEVELS,
  fundingType: ALL_FUNDING_TYPES,
  cgpa: MAX_CGPA,
  closingSoonOnly: false,
};

export const REGIONS = ["North America", "Europe", "Asia", "Oceania", "Middle East", "Global"] as const;
export type Region = (typeof REGIONS)[number];

const COUNTRY_REGION: Record<ScholarshipCountry, Region> = {
  USA: "North America",
  Canada: "North America",
  UK: "Europe",
  Ireland: "Europe",
  Germany: "Europe",
  Netherlands: "Europe",
  Belgium: "Europe",
  France: "Europe",
  Switzerland: "Europe",
  Italy: "Europe",
  Spain: "Europe",
  Sweden: "Europe",
  Finland: "Europe",
  Denmark: "Europe",
  Poland: "Europe",
  Hungary: "Europe",
  Turkey: "Europe",
  Australia: "Oceania",
  "New Zealand": "Oceania",
  Japan: "Asia",
  "South Korea": "Asia",
  China: "Asia",
  "Hong Kong": "Asia",
  Taiwan: "Asia",
  Singapore: "Asia",
  Malaysia: "Asia",
  India: "Asia",
  "Saudi Arabia": "Middle East",
  "Multiple Countries": "Global",
};

export function regionOf(country: ScholarshipCountry): Region {
  return COUNTRY_REGION[country];
}

/** Deadlines within this many days are called out as "closing soon". Scholarship
 * applications take longer to prepare than a conference submission, so this
 * window is wider than the one used for the Conference Calendar. */
export const CLOSING_SOON_DAYS = 30;

export function passesScholarshipFilters(
  scholarship: Scholarship,
  filters: ScholarshipFilters
) {
  const countryOk =
    filters.country === ALL_COUNTRIES || scholarship.country === filters.country;
  const levelOk =
    filters.degreeLevel === ALL_DEGREE_LEVELS ||
    scholarship.degreeLevels.includes(filters.degreeLevel as never);
  const fundingOk =
    filters.fundingType === ALL_FUNDING_TYPES ||
    scholarship.fundingType === filters.fundingType;
  const regionOk =
    filters.region === ALL_REGIONS || regionOf(scholarship.country) === filters.region;
  const cgpaOk = scholarship.minCgpa <= filters.cgpa;
  const closingOk = !filters.closingSoonOnly || isClosingSoon(scholarship.deadline);
  return countryOk && regionOk && levelOk && fundingOk && cgpaOk && closingOk;
}

export function sortScholarshipsByDeadline(scholarships: Scholarship[]) {
  return [...scholarships].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );
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

export function formatMonthLabel(year: number, month: number) {
  return new Date(year, month, 1).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

export type MonthGroup = {
  key: string;
  label: string;
  items: Scholarship[];
};

/** Groups scholarships by deadline month, in chronological order. */
export function groupByMonth(scholarships: Scholarship[]): MonthGroup[] {
  const sorted = sortScholarshipsByDeadline(scholarships);
  const groups = new Map<string, MonthGroup>();

  for (const scholarship of sorted) {
    const d = new Date(scholarship.deadline);
    const year = d.getFullYear();
    const month = d.getMonth();
    const key = `${year}-${String(month + 1).padStart(2, "0")}`;
    if (!groups.has(key)) {
      groups.set(key, { key, label: formatMonthLabel(year, month), items: [] });
    }
    groups.get(key)!.items.push(scholarship);
  }

  return Array.from(groups.values());
}

/** Scholarships run every year, so a deadline that has passed moves to the
 * same date next year — the list always shows the next upcoming round. */
function nextRoundDeadline(dateIso: string) {
  const d = new Date(dateIso);
  while (daysUntil(d.toISOString().slice(0, 10)) < 0) {
    d.setFullYear(d.getFullYear() + 1);
  }
  return d.toISOString().slice(0, 10);
}

export function withUpcomingDeadlines(scholarships: Scholarship[]): Scholarship[] {
  return scholarships.map((s) => ({ ...s, deadline: nextRoundDeadline(s.deadline) }));
}

export function findScholarship(id: string) {
  const found = SCHOLARSHIPS.find((s) => s.id === id);
  return found && withUpcomingDeadlines([found])[0];
}

export function officialSiteHost(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}
