import { Button } from "@/components/ui/Button";
import { Accent } from "@/components/PageHeader";
import { Globe } from "@/components/home/Globe";

const POINTS = [
  {
    label: "Free to start",
    icon: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-1.2 12.6-3.4-3.4 1.4-1.4 2 2 4.6-4.6 1.4 1.4z" fill="currentColor" />,
  },
  {
    label: "Official sources",
    icon: <path d="M12 2.5 4 5.5v6c0 4.6 3.3 8.6 8 10 4.7-1.4 8-5.4 8-10v-6zm-1.2 13.1-3.4-3.4 1.4-1.4 2 2 4.6-4.6 1.4 1.4z" fill="currentColor" />,
  },
  {
    label: "Made in Bangladesh",
    icon: <path d="M5 21V4h1.8v1H19l-2.5 4.5L19 14H6.8v7z" fill="currentColor" />,
  },
];

// A sprinkle of fixed "stars" behind the globe.
const STARS = Array.from({ length: 34 }, (_, i) => ({
  left: (i * 37.3) % 100,
  top: (i * 61.7) % 100,
  size: i % 5 === 0 ? 2 : 1,
  delay: (i % 7) * 0.6,
}));

export function CTA() {
  return (
    <section className="bg-paper px-6 pb-10 pt-4">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 overflow-hidden rounded-[30px] bg-[#1A1C20] px-6 pt-14 sm:px-14 sm:pt-16 md:grid-cols-[1.1fr_0.9fr] md:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-1/2">
          {STARS.map((s, i) => (
            <span
              key={i}
              className="ill-twinkle absolute rounded-full bg-white/60"
              style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
            />
          ))}
        </div>

        <div className="relative max-w-140">
          <h2 className="font-display text-[clamp(38px,5vw,64px)] leading-[1.04] tracking-[-0.035em] text-white">
            Your journey abroad
            <br />
            starts with <Accent>one step.</Accent>
          </h2>
          <p className="mt-5 max-w-110 font-body text-[17px] leading-relaxed text-white/65">
            Nine quick questions. No sign-up. An honest look at where you stand and what to do next.
          </p>
          <Button
            href="/readiness"
            variant="primary"
            className="mt-8 rounded-pill bg-red! px-7 py-3.5 text-[17px] shadow-none! hover:bg-[#E62F3B]!"
          >
            Check my readiness
          </Button>
          <ul className="mt-10 flex list-none flex-wrap gap-x-6 gap-y-2.5 p-0">
            {POINTS.map((p) => (
              <li key={p.label} className="flex items-center gap-2 font-body text-[14px] text-white/80">
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden className="text-white/90">
                  {p.icon}
                </svg>
                {p.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto mb-6 w-[calc(100%+1rem)] max-w-105 md:-my-6 md:mb-0 md:w-full md:max-w-115">
          <div
            aria-hidden
            className="absolute inset-[8%] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(255,59,71,0.16), transparent 70%)" }}
          />
          <Globe className="relative" />
        </div>
      </div>
    </section>
  );
}
