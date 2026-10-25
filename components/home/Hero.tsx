import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Kicker, Accent } from "@/components/PageHeader";
import { FeatureShowcase } from "@/components/home/FeatureShowcase";

// Staggered entrance: each block rises in a beat after the one before.
const rise = (step: number) => ({ animationDelay: `${120 + step * 110}ms` });

// Official programme logos in greyscale so they sit quietly together; each
// shows its own colours on hover. Commonwealth's file is white, so it is
// darkened instead.
const SOURCES = [
  { name: "Fulbright", src: "/logos/fulbright.svg", w: 494, h: 93, cls: "h-5" },
  { name: "Chevening", src: "/logos/chevening.png", w: 600, h: 596, cls: "h-13" },
  { name: "DAAD", src: "/logos/daad.svg", w: 1134, h: 350, cls: "h-6" },
  { name: "Commonwealth Scholarships", src: "/logos/commonwealth.png", w: 500, h: 151, cls: "h-10 brightness-0 hover:brightness-0" },
  { name: "Erasmus+", src: "/logos/erasmus.svg", w: 312, h: 89, cls: "h-8" },
];

const SOUTH_ASIA = [
  { name: "Bangladesh", flag: "🇧🇩" },
  { name: "India", flag: "🇮🇳" },
  { name: "Nepal", flag: "🇳🇵" },
  { name: "Sri Lanka", flag: "🇱🇰" },
  { name: "Pakistan", flag: "🇵🇰" },
  { name: "Bhutan", flag: "🇧🇹" },
];

export function Hero() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-24 pt-14 sm:pt-20 md:grid-cols-[1.1fr_0.9fr] md:gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          <div style={rise(0)} className="animate-rise">
            <Kicker>
              <span className="inline-flex items-center gap-2.5">
                <span className="flex" aria-hidden>
                  {SOUTH_ASIA.map((f, i) => (
                    <span
                      key={f.name}
                      title={f.name}
                      // Earlier flags sit on top, so Bangladesh leads the stack.
                      style={{ zIndex: SOUTH_ASIA.length - i }}
                      className={`relative grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-white text-[26px] leading-none shadow-[0_0_0_1px_rgba(11,18,32,0.18)] ring-2 ring-white ${i ? "-ml-1" : ""}`}
                    >
                      <span className="block translate-y-[1px] scale-125">{f.flag}</span>
                    </span>
                  ))}
                </span>
                Built for South Asian students · Free to start
              </span>
            </Kicker>
          </div>

          <h1 className="mt-6 font-display text-[clamp(52px,7.4vw,96px)] leading-[0.98] tracking-[-0.05em] text-ink">
            <span style={rise(1)} className="block animate-rise">
              Your path to
            </span>
            <span style={rise(2)} className="block animate-rise">
              <Accent>studying</Accent> abroad
            </span>
          </h1>

          <p style={rise(3)} className="mt-6 max-w-120 animate-rise font-body text-[19px] leading-relaxed text-sub">
            Check how ready you are, find universities and professors that fit, and never
            miss a scholarship or conference deadline.
          </p>

          <div style={rise(4)} className="mt-8 flex animate-rise flex-wrap gap-3">
            <Button href="/readiness" variant="primary" className="px-6.5 py-3.5 text-[17px]">
              Check my readiness
            </Button>
            <Button href="#how-it-works" variant="ghost" className="px-6.5 py-3.5 text-[17px]">
              How it works
            </Button>
          </div>

          <div style={rise(5)} className="mt-14 animate-rise">
            <p className="font-body text-[14px] text-sub">Scholarships we track, with official links:</p>
            <ul className="mt-4 flex list-none flex-wrap items-center gap-x-8 gap-y-4 p-0">
              {SOURCES.map((s) => (
                <li key={s.name}>
                  <Image
                    src={s.src}
                    alt={s.name}
                    width={s.w}
                    height={s.h}
                    unoptimized
                    className={`${s.cls} w-auto opacity-60 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tablets keep the showcase beside the copy, just smaller. */}
        <div className="md:max-lg:[zoom:0.78]">
          <FeatureShowcase />
        </div>
      </div>
    </section>
  );
}
