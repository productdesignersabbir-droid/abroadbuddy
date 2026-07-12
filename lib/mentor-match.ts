import type { Mentor } from "@/data/mentors";

export type MentorFilters = {
  sessionType: string;
  country: string;
  field: string;
  maxPrice: number;
};

export const ALL_SESSION_TYPES = "All Session Types";
export const ALL_COUNTRIES = "All Countries";
export const ALL_FIELDS = "All Fields";
export const MIN_PRICE = 10;
export const MAX_PRICE = 50;

export const DEFAULT_FILTERS: MentorFilters = {
  sessionType: ALL_SESSION_TYPES,
  country: ALL_COUNTRIES,
  field: ALL_FIELDS,
  maxPrice: MAX_PRICE,
};

export function passesMentorFilters(mentor: Mentor, filters: MentorFilters) {
  const sessionOk =
    filters.sessionType === ALL_SESSION_TYPES ||
    mentor.sessionTypes.includes(filters.sessionType as Mentor["sessionTypes"][number]);
  const countryOk =
    filters.country === ALL_COUNTRIES || mentor.country === filters.country;
  const fieldOk = filters.field === ALL_FIELDS || mentor.field === filters.field;
  const priceOk = mentor.price <= filters.maxPrice;
  return sessionOk && countryOk && fieldOk && priceOk;
}

export function formatPrice(price: number) {
  return `$${price}/session`;
}
