import type { Story } from "@/data/stories";

export type SortMode = "latest" | "reactions";

export type StoryFilters = {
  country: string;
  field: string;
  sort: SortMode;
};

export const ALL_COUNTRIES = "All Countries";
export const ALL_FIELDS = "All Fields";

export const DEFAULT_FILTERS: StoryFilters = {
  country: ALL_COUNTRIES,
  field: ALL_FIELDS,
  sort: "latest",
};

export function passesStoryFilters(story: Story, filters: StoryFilters) {
  const countryOk =
    filters.country === ALL_COUNTRIES || story.destinationCountry === filters.country;
  const fieldOk = filters.field === ALL_FIELDS || story.field === filters.field;
  return countryOk && fieldOk;
}

export function sortStories(
  stories: Story[],
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

export function formatStoryDate(dateIso: string) {
  return new Date(dateIso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
