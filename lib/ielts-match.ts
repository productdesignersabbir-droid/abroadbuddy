import type { Coach, CoachSessionType, ExamType } from "@/data/ielts";

export type CoachFilters = {
  examType: string;
  sessionType: string;
};

export const ALL_EXAM_TYPES = "All Exams";
export const ALL_COACH_SESSION_TYPES = "All Session Types";

export const DEFAULT_COACH_FILTERS: CoachFilters = {
  examType: ALL_EXAM_TYPES,
  sessionType: ALL_COACH_SESSION_TYPES,
};

export function passesCoachFilters(coach: Coach, filters: CoachFilters): boolean {
  const examOk =
    filters.examType === ALL_EXAM_TYPES ||
    coach.examTypes.includes(filters.examType as ExamType);
  const sessionOk =
    filters.sessionType === ALL_COACH_SESSION_TYPES ||
    coach.sessionTypes.includes(filters.sessionType as CoachSessionType);
  return examOk && sessionOk;
}

export function formatCoachPrice(price: number): string {
  return `$${price}/session`;
}
