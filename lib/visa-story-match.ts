import type { VisaOutcome, VisaStory } from "@/data/visa-stories";

export type SortMode = "latest" | "reactions";

export type VisaStoryFilters = {
  country: string;
  outcome: string;
  sort: SortMode;
};

export const ALL_COUNTRIES = "All Countries";
export const ALL_OUTCOMES = "All Outcomes";

export const DEFAULT_FILTERS: VisaStoryFilters = {
  country: ALL_COUNTRIES,
  outcome: ALL_OUTCOMES,
  sort: "latest",
};

export function passesVisaStoryFilters(story: VisaStory, filters: VisaStoryFilters) {
  const countryOk =
    filters.country === ALL_COUNTRIES || story.destinationCountry === filters.country;
  const outcomeOk =
    filters.outcome === ALL_OUTCOMES || story.outcome === (filters.outcome as VisaOutcome);
  return countryOk && outcomeOk;
}

export function sortVisaStories(
  stories: VisaStory[],
  sort: SortMode,
  reactionCounts: Record<string, number>
) {
  const withCounts = stories.map((story) => ({
    story,
    count: reactionCounts[story.id] ?? story.reactionCount,
  }));

  withCounts.sort((a, b) => {
    if (sort === "reactions") {
      return b.count - a.count;
    }
    return (
      new Date(b.story.postedDate).getTime() - new Date(a.story.postedDate).getTime()
    );
  });

  return withCounts.map((entry) => entry.story);
}

export function formatVisaStoryDate(dateIso: string) {
  return new Date(dateIso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
