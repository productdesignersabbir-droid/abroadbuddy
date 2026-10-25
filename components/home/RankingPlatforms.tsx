"use client";

import { useReveal } from "@/lib/use-reveal";
import { SectionHead } from "@/components/home/SectionHead";
import { Accent } from "@/components/PageHeader";
import { IconExternalLink } from "@/components/conferences/icons";

type Entry = { rank: string; name: string; flag: string };

// Top five from each system's latest edition (checked October 2026). Ties
// share a rank, shown with "=".
const PLATFORMS: {
  name: string;
  edition: string;
  href: string;
  top: Entry[];
}[] = [
  {
    name: "QS World University Rankings",
    edition: "2027 edition",
    href: "https://www.topuniversities.com/world-university-rankings",
    top: [
      { rank: "1", name: "MIT", flag: "🇺🇸" },
      { rank: "=2", name: "Imperial College London", flag: "🇬🇧" },
      { rank: "=2", name: "Stanford University", flag: "🇺🇸" },
      { rank: "4", name: "University of Oxford", flag: "🇬🇧" },
      { rank: "5", name: "Harvard University", flag: "🇺🇸" },
    ],
  },
  {
    name: "Times Higher Education",
    edition: "2027 edition",
    href: "https://www.timeshighereducation.com/world-university-rankings/latest/world-ranking",
    top: [
      { rank: "1", name: "University of Oxford", flag: "🇬🇧" },
      { rank: "2", name: "MIT", flag: "🇺🇸" },
      { rank: "=3", name: "Princeton University", flag: "🇺🇸" },
      { rank: "=3", name: "Stanford University", flag: "🇺🇸" },
      { rank: "5", name: "University of Cambridge", flag: "🇬🇧" },
    ],
  },
  {
    name: "US News Best Global Universities",
    edition: "2026–2027 edition",
    href: "https://www.usnews.com/education/best-global-universities/rankings",
    top: [
      { rank: "1", name: "Harvard University", flag: "🇺🇸" },
      { rank: "2", name: "MIT", flag: "🇺🇸" },
      { rank: "3", name: "Stanford University", flag: "🇺🇸" },
      { rank: "4", name: "University of Oxford", flag: "🇬🇧" },
      { rank: "5", name: "University of Cambridge", flag: "🇬🇧" },
    ],
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
      className="flex flex-col rounded-[30px] bg-white p-6 transition-[opacity,transform] duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-[26px] leading-tight tracking-[-0.02em] text-ink">
          {platform.name}
        </h3>
        <span className="mt-1 shrink-0 rounded-pill bg-soft px-2.5 py-1 font-body text-[12px] text-sub">
          {platform.edition}
        </span>
      </div>

      <ol className="mt-5 grid list-none grid-cols-1 p-0">
        {platform.top.map((u, idx) => (
          <li
            key={u.name}
            style={{ transitionDelay: `${150 + i * 60 + idx * 70}ms` }}
            className={`flex items-center gap-3.5 border-t border-line py-3 transition-[opacity,transform] duration-500 ${
              seen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
            }`}
          >
            <span
              className={`w-9 shrink-0 font-display text-[24px] leading-none tabular-nums ${
                idx === 0 ? "text-ink" : "text-ink/45"
              }`}
            >
              {u.rank}
            </span>
            <span className="text-[17px] leading-none" aria-hidden>
              {u.flag}
            </span>
            <span className="min-w-0 flex-1 truncate font-body text-[15px] text-ink">{u.name}</span>
          </li>
        ))}
      </ol>

      <div className="mt-auto border-t border-line pt-5">
        <a
          href={platform.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-button bg-softer px-4.5 py-2.5 font-body text-sm text-ink transition-colors hover:bg-[#E2DCD2]"
        >
          See the full ranking
          <IconExternalLink color="#0B1220" />
        </a>
      </div>
    </div>
  );
}

export function RankingPlatforms() {
  return (
    <section className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          kicker="Global rankings"
          title={
            <>
              Cross-check with the <Accent>rankings</Accent> that matter
            </>
          }
          sub="The top five in each of the big three global rankings. Open the full list on the official site."
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
