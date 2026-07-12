"use client";

import { useReveal } from "@/lib/use-reveal";
import { SectionHead } from "@/components/home/SectionHead";
import { FallbackImage } from "@/components/ui/FallbackImage";
import { IconExternalLink } from "@/components/conferences/icons";

const PLATFORMS = [
  {
    name: "QS World University Rankings",
    desc: "The most widely cited global ranking — compare universities by subject, employability and research impact.",
    href: "https://www.topuniversities.com/university-rankings",
    imageSrc:
      "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Modern university building facade with a landscaped lawn",
  },
  {
    name: "Times Higher Education Rankings",
    desc: "THE's World University Rankings weigh teaching, research and international outlook across 100+ countries.",
    href: "https://www.timeshighereducation.com/world-university-rankings/latest/world-ranking",
    imageSrc:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Grand classical university academic building with a lawn",
  },
  {
    name: "US News Best Global Universities",
    desc: "A trusted US-centric ranking, useful for comparing national universities and program-level strength.",
    href: "https://www.usnews.com/best-colleges/rankings/national-universities",
    imageSrc:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Curved rows of bookshelves in a university library",
  },
];

function PlatformCard({
  platform,
  i,
}: {
  platform: (typeof PLATFORMS)[number];
  i: number;
}) {
  const [ref, seen] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${i * 60}ms`,
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(16px)",
      }}
      className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-[0_2px_6px_rgba(11,18,32,0.04)] transition-[opacity,transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(11,18,32,0.22)]"
    >
      <div className="relative h-44 w-full">
        <FallbackImage
          src={platform.imageSrc}
          alt={platform.imageAlt}
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5.5">
        <h3 className="font-display text-lg font-bold leading-snug text-ink">
          {platform.name}
        </h3>
        <p className="mt-2.25 font-body text-[14px] leading-relaxed text-sub">
          {platform.desc}
        </p>
        <div className="mt-auto pt-5">
          <a
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-button bg-blue px-4 py-2.5 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
          >
            Visit rankings
            <IconExternalLink color="#FFFFFF" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function RankingPlatforms() {
  return (
    <section className="bg-paper py-22">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          kicker="Global rankings"
          title="Top universities, ranked by the platforms that matter"
          sub="Cross-check your shortlist against the world's most trusted university ranking systems before you commit."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORMS.map((platform, i) => (
            <PlatformCard key={platform.name} platform={platform} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
