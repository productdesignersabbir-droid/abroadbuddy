import { RESEARCH_MENTORS, type ResearchMentor } from "@/data/research-mentors";

export type SortMode = "rating" | "price";

export type ResearchMentorFilters = {
  category: string;
  interest: string;
  sort: SortMode;
};

export const ALL_CATEGORIES = "All Categories";
export const ALL_INTERESTS = "All Interests";

export const DEFAULT_FILTERS: ResearchMentorFilters = {
  category: ALL_CATEGORIES,
  interest: ALL_INTERESTS,
  sort: "rating",
};

export function passesResearchMentorFilters(
  mentor: ResearchMentor,
  filters: ResearchMentorFilters
) {
  const categoryOk = filters.category === ALL_CATEGORIES || mentor.category === filters.category;
  const interestOk =
    filters.interest === ALL_INTERESTS || mentor.researchInterests.includes(filters.interest);
  return categoryOk && interestOk;
}

export function sortResearchMentors(mentors: ResearchMentor[], sort: SortMode) {
  const copy = [...mentors];
  copy.sort((a, b) => {
    if (sort === "price") return a.price - b.price;
    return b.rating - a.rating || b.reviewCount - a.reviewCount;
  });
  return copy;
}

export function formatPrice(price: number) {
  return `$${price}/session`;
}

export function findResearchMentor(id: string): ResearchMentor | undefined {
  return RESEARCH_MENTORS.find((m) => m.id === id);
}

export type TimeSlot = {
  id: string;
  dateLabel: string;
  timeLabel: string;
};

const SLOT_TIMES = ["10:00 AM", "2:00 PM", "5:30 PM"];

export function generateAvailableSlots(count = 6): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const cursor = new Date();

  while (slots.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    const day = cursor.getDay();
    if (day === 0 || day === 6) continue;

    const dateLabel = cursor.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const timeLabel = SLOT_TIMES[slots.length % SLOT_TIMES.length];
    slots.push({ id: `${cursor.toISOString().slice(0, 10)}-${timeLabel}`, dateLabel, timeLabel });
  }

  return slots;
}
