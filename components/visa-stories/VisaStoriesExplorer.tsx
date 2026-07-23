"use client";

import { useMemo, useState } from "react";
import type { VisaStory } from "@/data/visa-stories";
import {
  DEFAULT_FILTERS,
  passesVisaStoryFilters,
  sortVisaStories,
} from "@/lib/visa-story-match";
import { VisaStoryFilterBar } from "@/components/visa-stories/VisaStoryFilterBar";
import { VisaStoryCard } from "@/components/visa-stories/VisaStoryCard";
import { VisaStoryDetailsModal } from "@/components/visa-stories/VisaStoryDetailsModal";

export function VisaStoriesExplorer({ stories }: { stories: VisaStory[] }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selected, setSelected] = useState<VisaStory | null>(null);
  const [reactions, setReactions] = useState<Record<string, boolean>>({});

  const approvedStories = useMemo(
    () => stories.filter((story) => story.status === "approved"),
    [stories]
  );

  const reactionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const story of approvedStories) {
      counts[story.id] = story.reactionCount + (reactions[story.id] ? 1 : 0);
    }
    return counts;
  }, [approvedStories, reactions]);

  const results = useMemo(() => {
    const filtered = approvedStories.filter((story) => passesVisaStoryFilters(story, filters));
    return sortVisaStories(filtered, filters.sort, reactionCounts);
  }, [approvedStories, filters, reactionCounts]);

  function toggleReaction(id: string) {
    setReactions((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        <VisaStoryFilterBar filters={filters} onChange={setFilters} />

        <div className="mt-8 flex items-center justify-between">
          <p className="font-body text-sm text-sub">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "story" : "stories"} match your filters
          </p>
          {(filters.country !== DEFAULT_FILTERS.country ||
            filters.outcome !== DEFAULT_FILTERS.outcome ||
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
              <VisaStoryCard
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
              No visa stories match those filters
            </p>
            <p className="mt-2 font-body text-sm text-sub">
              Try a different destination or switch to &quot;All Outcomes&quot;.
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
        <VisaStoryDetailsModal
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
