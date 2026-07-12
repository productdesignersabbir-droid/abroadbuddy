import type { Lab, SubScores } from "@/data/labs";

export type LabFilters = {
  search: string;
  country: string;
  field: string;
};

export const ALL_COUNTRIES = "All Countries";
export const ALL_FIELDS = "All Fields";

export const DEFAULT_FILTERS: LabFilters = {
  search: "",
  country: ALL_COUNTRIES,
  field: ALL_FIELDS,
};

export const SUBSCORE_LABELS: { key: keyof SubScores; label: string }[] = [
  { key: "mentorship", label: "Mentorship" },
  { key: "funding", label: "Funding & stipend" },
  { key: "workLifeBalance", label: "Work-life balance" },
  { key: "publishing", label: "Publishing output" },
];

export function getOverallRating(lab: Lab) {
  const { mentorship, funding, workLifeBalance, publishing } = lab.subScores;
  const avg = (mentorship + funding + workLifeBalance + publishing) / 4;
  return Math.round(avg * 10) / 10;
}

export function passesLabFilters(lab: Lab, filters: LabFilters) {
  const query = filters.search.trim().toLowerCase();
  const searchOk =
    query === "" ||
    lab.professor.toLowerCase().includes(query) ||
    lab.university.toLowerCase().includes(query);
  const countryOk =
    filters.country === ALL_COUNTRIES || lab.country === filters.country;
  const fieldOk = filters.field === ALL_FIELDS || lab.field === filters.field;
  return searchOk && countryOk && fieldOk;
}

export function formatReviewDate(dateIso: string) {
  return new Date(dateIso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}
