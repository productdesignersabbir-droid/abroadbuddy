import type { Difficulty, Major, University } from "@/data/universities";

export type UniversityFilters = {
  cgpa: number;
  country: string;
  major: string;
  budget: number;
};

export const ALL_COUNTRIES = "All Countries";
export const ALL_MAJORS = "All Majors";
export const MAX_BUDGET = 65000;

export const DEFAULT_FILTERS: UniversityFilters = {
  cgpa: 3.6,
  country: ALL_COUNTRIES,
  major: ALL_MAJORS,
  budget: MAX_BUDGET,
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

export const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  "Highly Competitive": "bg-red/10 text-red border-red/20",
  Competitive: "bg-blue/10 text-blue border-blue/20",
  Moderate: "bg-soft text-ink border-line",
};

export function formatTuition(min: number, max: number) {
  const fmt = (n: number) => `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `${fmt(min)} – ${fmt(max)}/yr`;
}
