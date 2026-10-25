"use client";

import { useEffect, useState } from "react";
import { FallbackImage } from "@/components/ui/FallbackImage";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;

const SLIDES = [
  {
    name: "University of Oxford",
    country: "🇬🇧 UK",
    src: photo("1612563958093-2c3bcfbd8760"),
    alt: "The Radcliffe Camera among Oxford's historic college buildings",
    position: "object-center",
  },
  {
    name: "MIT",
    country: "🇺🇸 USA",
    src: photo("1688584177501-48149db977dc"),
    alt: "MIT's Great Dome above the columns of the main building",
    // Portrait shot: keep both the dome and the carved name in frame.
    position: "object-[center_67%] lg:object-[center_60%]",
  },
  {
    name: "Harvard University",
    country: "🇺🇸 USA",
    src: photo("1579862325998-44e49ab74138"),
    alt: "Students on the steps of Harvard's Widener Library",
    position: "object-center",
  },
  {
    name: "University of Cambridge",
    country: "🇬🇧 UK",
    src: photo("1623632306901-e509641e7191"),
    alt: "King's College Chapel and lawn in Cambridge",
    position: "object-center",
  },
  {
    name: "Stanford University",
    country: "🇺🇸 USA",
    src: photo("1681782421891-5088f13466ec"),
    alt: "Hoover Tower behind Stanford's sandstone Main Quad",
    position: "object-center",
  },
];

/** Each campus holds for about 2 seconds, then crossfades (800ms) to the next. */
const SLIDE_MS = 2800;

export function TopUniversitiesCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % SLIDES.length),
      SLIDE_MS
    );
    return () => window.clearTimeout(id);
  }, [active, paused, reduceMotion]);

  const current = SLIDES[active];

  return (
    <div
      className="absolute inset-0"
      role="region"
      aria-roledescription="carousel"
      aria-label="Top universities"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {SLIDES.map((slide, i) => {
        const isActive = i === active;
        return (
          <div
            key={slide.name}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-800 ease-in-out motion-reduce:transition-none ${
              isActive ? "z-1 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <FallbackImage
              src={slide.src}
              alt={slide.alt}
              priority={i === 0}
              sizes="(min-width: 1024px) 45vw, 100vw"
              // Slow Ken Burns zoom while the slide is on screen.
              className={`object-cover ${slide.position} transition-transform ease-linear ${
                isActive && !reduceMotion
                  ? "scale-[1.08] duration-[3600ms]"
                  : "scale-100 duration-1000"
              }`}
            />
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-2 h-28 bg-linear-to-t from-ink/55 to-transparent" />

      <div
        aria-live={paused || reduceMotion ? "polite" : "off"}
        className="absolute bottom-4 left-4 z-3 max-w-[calc(100%-7rem)] rounded-pill bg-white/95 px-3.5 py-1.75 backdrop-blur-sm"
      >
        <span key={current.name} className="block truncate font-body text-[13px] text-ink">
          <span className="font-semibold">{current.name}</span>
          <span className="text-sub"> · {current.country}</span>
        </span>
      </div>

      <div className="absolute bottom-5.5 right-4 z-3 flex items-center gap-1.5">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.name}
            type="button"
            aria-label={`Show ${slide.name}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-5 bg-white" : "w-2 bg-white/55 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
