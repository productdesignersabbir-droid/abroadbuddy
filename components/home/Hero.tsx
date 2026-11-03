import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Kicker, Accent } from "@/components/PageHeader";
import { HeroDoor } from "@/components/home/HeroDoor";

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

export function Hero() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-24 pt-14 sm:pt-20 md:grid-cols-[1.1fr_0.9fr] md:gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          <div style={rise(0)} className="animate-rise">
            <Kicker>For Bangladeshi students aiming for funded places abroad</Kicker>
          </div>

          <h1 className="mt-6 font-display text-[clamp(42px,5.6vw,76px)] leading-[1.02] tracking-[-0.045em] text-ink">
            <span style={rise(1)} className="block animate-rise">
              Your whole <span className="whitespace-nowrap">study-abroad</span>
            </span>
            <span style={rise(2)} className="block animate-rise">
              <Accent>journey.</Accent>{" "}
              <span className="bg-linear-to-r from-blue to-red bg-clip-text pr-[0.04em] text-transparent">
                One platform.
              </span>
            </span>
          </h1>

          <div style={rise(3)} className="animate-rise">
            <p className="mt-6 font-display text-[clamp(24px,2.6vw,34px)] leading-[1.15] tracking-[-0.02em] text-blue">
              Get paid to earn your master&apos;s or PhD.
            </p>
            <p className="mt-4 max-w-120 font-body text-[19px] leading-relaxed text-sub">
              Funded places cover your tuition and pay you a monthly stipend. We help you find them, apply for them
              and get there, one clear step at a time.
            </p>
          </div>

          <div style={rise(4)} className="mt-8 grid max-w-[34rem] animate-rise grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-3">
            <Button href="/readiness" variant="primary" className="justify-center px-6.5 py-3.5 text-[17px]">
              Start Abroad Readiness
            </Button>
            <Button href="/application-studio" variant="ghost" className="justify-center px-6.5 py-3.5 text-[17px]">
              Explore Application Studio
            </Button>
          </div>
          <p style={rise(4)} className="mt-3 animate-rise font-body text-[14px] text-sub">
            Free · nine quick questions
          </p>

          <div style={rise(5)} className="mt-14 hidden animate-rise sm:block">
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

        {/* The looping FeatureShowcase is parked for now; it may move elsewhere later. */}
        <div style={rise(2)} className="animate-rise">
          <HeroDoor />
        </div>
      </div>
    </section>
  );
}
