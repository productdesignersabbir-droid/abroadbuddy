import {
  COUNTRY_INFO,
  type Difficulty,
  type Major,
  type University,
} from "@/data/universities";

export type UniversitySort = "match" | "rank" | "tuition";

export type UniversityFilters = {
  cgpa: number;
  country: string;
  major: string;
  budget: number;
  sort: UniversitySort;
};

export const ALL_COUNTRIES = "All Countries";
export const ALL_MAJORS = "All Majors";
export const MAX_BUDGET = 65000;

/** Rough exchange rate used only to give students a feel for costs in taka. */
export const BDT_PER_USD = 122;

export const SORT_OPTIONS: { value: UniversitySort; label: string }[] = [
  { value: "match", label: "Best match" },
  { value: "rank", label: "World ranking" },
  { value: "tuition", label: "Lowest tuition" },
];

export const DEFAULT_FILTERS: UniversityFilters = {
  cgpa: 3.6,
  country: ALL_COUNTRIES,
  major: ALL_MAJORS,
  budget: MAX_BUDGET,
  sort: "match",
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function computeMatch(uni: University, filters: UniversityFilters) {
  let score = 55;

  const cgpaDelta = filters.cgpa - uni.minCgpa;
  score += clamp(cgpaDelta * 45, -30, 25);

  if (filters.country === ALL_COUNTRIES || filters.country === uni.country) {
    score += 12;
  }

  if (
    filters.major === ALL_MAJORS ||
    uni.majors.includes(filters.major as Major)
  ) {
    score += 12;
  }

  if (uni.tuitionMin <= filters.budget) {
    score += 6;
  } else {
    score -= clamp((uni.tuitionMin - filters.budget) / 1500, 0, 25);
  }

  return clamp(Math.round(score), 38, 99);
}

export function passesHardFilters(
  uni: University,
  filters: UniversityFilters
) {
  const countryOk =
    filters.country === ALL_COUNTRIES || uni.country === filters.country;
  const majorOk =
    filters.major === ALL_MAJORS ||
    uni.majors.includes(filters.major as Major);
  const budgetOk = uni.tuitionMin <= filters.budget;
  return countryOk && majorOk && budgetOk;
}

export type FitReason = { label: string; ok: boolean };

/** Short, plain reasons behind the match score, shown on each result. */
export function fitReasons(uni: University, filters: UniversityFilters): FitReason[] {
  const cgpaGap = filters.cgpa - uni.minCgpa;
  return [
    {
      label:
        cgpaGap >= 0
          ? `CGPA ${filters.cgpa.toFixed(2)} meets ${uni.minCgpa.toFixed(2)}`
          : `CGPA ${Math.abs(cgpaGap).toFixed(2)} below typical`,
      ok: cgpaGap >= 0,
    },
    {
      label:
        filters.major === ALL_MAJORS
          ? `${uni.majors.length} majors offered`
          : `Offers ${filters.major}`,
      ok: true,
    },
    {
      label: uni.tuitionMax <= filters.budget ? "Within budget" : "May stretch budget",
      ok: uni.tuitionMax <= filters.budget,
    },
  ];
}

export function matchLabel(match: number) {
  if (match >= 85) return "Strong fit";
  if (match >= 70) return "Good fit";
  if (match >= 55) return "Possible fit";
  return "Reach";
}

export function sortResults<T extends { uni: University; match: number }>(
  results: T[],
  sort: UniversitySort
) {
  return [...results].sort((a, b) => {
    if (sort === "rank") return a.uni.worldRanking - b.uni.worldRanking;
    if (sort === "tuition") return a.uni.tuitionMin - b.uni.tuitionMin || a.uni.worldRanking - b.uni.worldRanking;
    return b.match - a.match || a.uni.worldRanking - b.uni.worldRanking;
  });
}

export const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  "Highly Competitive": "bg-red/8 text-red",
  Competitive: "bg-blue/8 text-blue",
  Moderate: "bg-soft text-ink",
};

const usdK = (n: number) => `$${(n / 1000).toFixed(n % 1000 === 0 || n >= 10000 ? 0 : 1)}k`;

export function formatTuition(min: number, max: number) {
  if (max === 0) return "No tuition";
  if (min === 0) return `Free – ${usdK(max)}/yr`;
  return `${usdK(min)} – ${usdK(max)}/yr`;
}

export function formatUsd(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

/** e.g. 2,440,000 → "৳24.4 lakh" */
export function formatBdt(usd: number) {
  const bdt = usd * BDT_PER_USD;
  if (bdt >= 10_000_000) return `৳${(bdt / 10_000_000).toFixed(2)} crore`;
  return `৳${(bdt / 100_000).toFixed(1)} lakh`;
}

export function yearlyCost(uni: University): [number, number] {
  const [livingMin, livingMax] = COUNTRY_INFO[uni.country].livingCost;
  return [uni.tuitionMin + livingMin, uni.tuitionMax + livingMax];
}

export function formatCount(n: number) {
  return n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`;
}
