"use client";

import { useEffect, useRef, useState } from "react";
import { Kicker } from "@/components/PageHeader";

/** The product launch film, shown between the hero and the problem section. */
export function LaunchVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Autoplay muted, except for people who asked for reduced motion.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void v.play().catch(() => {});
  }, []);

  function turnOnSound() {
    const v = video.current;
    if (!v) return;
    v.muted = false;
    v.currentTime = 0;
    void v.play();
  }

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Kicker>Watch the 1-minute tour</Kicker>
          <p className="font-body text-[15px] text-sub">From “where do I start?” to a clear plan.</p>
        </div>
        <div className="relative overflow-hidden rounded-[30px] bg-paper ring-1 ring-line shadow-[0_12px_28px_-22px_rgba(11,18,32,0.18)]">
          <video
            ref={video}
            className="block aspect-video w-full"
            src="/video/easiabroad-launch.mp4"
            poster="/video/easiabroad-launch-poster.jpg"
            muted
            loop
            playsInline
            controls
            preload="metadata"
            onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
          />
          {muted && (
            <button
              type="button"
              onClick={turnOnSound}
              className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-ink/80 py-2 pl-3 pr-4 font-body text-[14px] font-medium text-white backdrop-blur transition-colors hover:bg-ink sm:right-6 sm:top-6 sm:text-[15px]"
            >
              <svg viewBox="0 0 24 24" className="size-4.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
                <path d="M16 9.5l5 5M21 9.5l-5 5" />
              </svg>
              Turn on sound
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
