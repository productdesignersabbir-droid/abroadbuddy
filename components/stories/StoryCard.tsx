import type { Story } from "@/data/stories";
import { FallbackImage } from "@/components/ui/FallbackImage";
import { ReactionButton } from "@/components/stories/ReactionButton";

export function StoryCard({
  story,
  reacted,
  reactionCount,
  onToggleReaction,
  onOpen,
}: {
  story: Story;
  reacted: boolean;
  reactionCount: number;
  onToggleReaction: () => void;
  onOpen: () => void;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-[0_2px_6px_rgba(11,18,32,0.04)] transition-shadow duration-200 hover:shadow-[0_18px_40px_-18px_rgba(11,18,32,0.22)]">
      {story.coverImageSrc && (
        <div className="relative h-40 w-full">
          <FallbackImage
            src={story.coverImageSrc}
            alt={story.coverImageAlt ?? ""}
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5.5">
        <div className="flex items-center gap-2.5">
          <div className="relative h-8.5 w-8.5 shrink-0 overflow-hidden rounded-full border border-line">
            <FallbackImage
              src={story.authorAvatarSrc}
              alt={story.authorAvatarAlt}
              className="object-cover"
              sizes="34px"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate font-body text-[13px] font-semibold text-ink">
              {story.authorName}
            </p>
            <p className="truncate font-body text-[12px] text-sub">
              {story.destinationUniversity} · {story.destinationCountry}
            </p>
          </div>
        </div>

        <h3 className="mt-3.5 font-display text-[17px] font-bold leading-snug text-ink">
          {story.title}
        </h3>
        <p className="mt-2 line-clamp-3 font-body text-[13.5px] leading-relaxed text-sub">
          {story.snippet}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4.5">
          <ReactionButton
            reacted={reacted}
            count={reactionCount}
            onToggle={onToggleReaction}
          />
          <button
            type="button"
            onClick={onOpen}
            className="font-label text-[11.5px] font-semibold uppercase tracking-[0.06em] text-blue"
          >
            Read full story
          </button>
        </div>
      </div>
    </div>
  );
}
