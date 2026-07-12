"use client";

import { useEffect } from "react";
import type { Story } from "@/data/stories";
import { formatStoryDate } from "@/lib/story-match";
import { FallbackImage } from "@/components/ui/FallbackImage";
import { ReactionButton } from "@/components/stories/ReactionButton";

export function StoryDetailsModal({
  story,
  reacted,
  reactionCount,
  onToggleReaction,
  onClose,
}: {
  story: Story;
  reacted: boolean;
  reactionCount: number;
  onToggleReaction: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-modal-title"
      className="fixed inset-0 z-100 flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-160 overflow-y-auto rounded-t-[24px] bg-white shadow-[0_30px_70px_-20px_rgba(11,18,32,0.4)] sm:rounded-card"
        onClick={(e) => e.stopPropagation()}
      >
        {story.coverImageSrc && (
          <div className="relative h-44 w-full sm:h-56">
            <FallbackImage
              src={story.coverImageSrc}
              alt={story.coverImageAlt ?? ""}
              className="object-cover"
              sizes="(min-width: 640px) 640px, 100vw"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close story"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-ink shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="#0B1220"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="p-6 sm:p-7.5">
          {!story.coverImageSrc && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close story"
                className="grid h-9 w-9 place-items-center rounded-full text-sub transition-colors hover:bg-soft"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-line">
              <FallbackImage
                src={story.authorAvatarSrc}
                alt={story.authorAvatarAlt}
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-ink">
                {story.authorName}
              </p>
              <p className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
                {story.destinationUniversity} · {story.destinationCountry} ·{" "}
                {formatStoryDate(story.postedDate)}
              </p>
            </div>
          </div>

          <h2
            id="story-modal-title"
            className="mt-4.5 font-display text-2xl font-bold leading-snug text-ink"
          >
            {story.title}
          </h2>

          <div className="mt-4.5 flex flex-col gap-3.5 font-body text-[15px] leading-relaxed text-sub">
            {story.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-6 border-t border-line pt-5">
            <ReactionButton
              reacted={reacted}
              count={reactionCount}
              onToggle={onToggleReaction}
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
