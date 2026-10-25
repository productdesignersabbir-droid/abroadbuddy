import type { Accepting, Lab, SubScores } from "@/data/labs";

export type LabFilters = {
  search: string;
  country: string;
  field: string;
  openOnly: boolean;
};

export const ALL_COUNTRIES = "All Countries";
export const ALL_FIELDS = "All Fields";

export const DEFAULT_FILTERS: LabFilters = {
  search: "",
  country: ALL_COUNTRIES,
  field: ALL_FIELDS,
  openOnly: false,
};

export const SUBSCORE_LABELS: { key: keyof SubScores; label: string; short: string }[] = [
  { key: "mentorship", label: "Mentorship", short: "Mentoring" },
  { key: "funding", label: "Funding & stipend", short: "Funding" },
  { key: "workLifeBalance", label: "Work-life balance", short: "Balance" },
  { key: "publishing", label: "Publishing output", short: "Publishing" },
];

export const ACCEPTING_STYLES: Record<Accepting, { label: string; dot: string; text: string }> = {
  Open: { label: "Accepting students", dot: "bg-[#2f9e6b]", text: "text-[#1f7a52]" },
  Limited: { label: "Limited places", dot: "bg-[#d99a2b]", text: "text-[#9a6a12]" },
  Closed: { label: "Not accepting", dot: "bg-sub", text: "text-sub" },
};

export function getOverallRating(lab: Lab) {
  const { mentorship, funding, workLifeBalance, publishing } = lab.subScores;
  const avg = (mentorship + funding + workLifeBalance + publishing) / 4;
  return Math.round(avg * 10) / 10;
}

export function passesLabFilters(lab: Lab, filters: LabFilters) {
  const query = filters.search.trim().toLowerCase();
  const haystack = [
    lab.professor,
    lab.university,
    lab.labName,
    lab.department,
    ...lab.researchAreas,
  ]
    .join(" ")
    .toLowerCase();
  const searchOk = query === "" || haystack.includes(query);
  const countryOk =
    filters.country === ALL_COUNTRIES || lab.country === filters.country;
  const fieldOk = filters.field === ALL_FIELDS || lab.field === filters.field;
  const openOk = !filters.openOnly || lab.accepting !== "Closed";
  return searchOk && countryOk && fieldOk && openOk;
}

export function initials(name: string) {
  return name
    .replace(/^(Prof\.|Dr\.)\s*/, "")
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Soft, warm tints for avatars so the grid doesn't read as one colour.
const AVATAR_TINTS = ["#efe6da", "#e4ebe4", "#e9e4ef", "#f1e3df", "#e2e9ef", "#ece8d8"];

export function avatarTint(id: string) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATAR_TINTS[h % AVATAR_TINTS.length];
}

export function formatReviewDate(dateIso: string) {
  return new Date(dateIso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}
