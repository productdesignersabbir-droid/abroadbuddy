"use client";

import { useMemo, useState } from "react";
import type { Story } from "@/data/stories";
import {
  DEFAULT_FILTERS,
  passesStoryFilters,
  sortStories,
} from "@/lib/story-match";
import { StoryFilterBar } from "@/components/stories/StoryFilterBar";
import { StoryCard } from "@/components/stories/StoryCard";
import { StoryDetailsModal } from "@/components/stories/StoryDetailsModal";

export function StoriesExplorer({ stories }: { stories: Story[] }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selected, setSelected] = useState<Story | null>(null);
  const [reactions, setReactions] = useState<Record<string, boolean>>({});

  const reactionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const story of stories) {
      counts[story.id] = story.reactionCount + (reactions[story.id] ? 1 : 0);
    }
    return counts;
  }, [stories, reactions]);

  const results = useMemo(() => {
    const filtered = stories.filter((story) => passesStoryFilters(story, filters));
    return sortStories(filtered, filters.sort, reactionCounts);
  }, [stories, filters, reactionCounts]);

  function toggleReaction(id: string) {
    setReactions((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        <StoryFilterBar filters={filters} onChange={setFilters} />

        <div className="mt-8 flex items-center justify-between">
          <p className="font-body text-sm text-sub">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "story" : "stories"} match your filters
          </p>
          {(filters.country !== DEFAULT_FILTERS.country ||
            filters.field !== DEFAULT_FILTERS.field ||
            filters.sort !== DEFAULT_FILTERS.sort) && (
            <button
              type="button"
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="font-label text-[11.5px] font-semibold uppercase tracking-[0.06em] text-blue"
            >
              Reset filters
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                reacted={!!reactions[story.id]}
                reactionCount={reactionCounts[story.id]}
                onToggleReaction={() => toggleReaction(story.id)}
                onOpen={() => setSelected(story)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-card border border-dashed border-line bg-white px-6 py-14 text-center">
            <p className="font-display text-lg font-bold text-ink">
              No stories match those filters
            </p>
            <p className="mt-2 font-body text-sm text-sub">
              Try a different destination or switch to &quot;All Fields&quot;.
            </p>
            <button
              type="button"
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="mt-5 rounded-button bg-blue px-5 py-2.5 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)]"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {selected && (
        <StoryDetailsModal
          story={selected}
          reacted={!!reactions[selected.id]}
          reactionCount={reactionCounts[selected.id]}
          onToggleReaction={() => toggleReaction(selected.id)}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
