import { Button } from "@/components/ui/Button";
import { Kicker, Accent } from "@/components/PageHeader";
import { NextDeadlinesCard } from "@/components/home/NextDeadlinesCard";

// Staggered entrance: each block rises in a beat after the one before.
const rise = (step: number) => ({ animationDelay: `${120 + step * 110}ms` });

const SOURCES = ["Fulbright", "Chevening", "DAAD", "Commonwealth", "Erasmus+"];

export function Hero() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-24 pt-14 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div style={rise(0)} className="animate-rise">
            <Kicker>Built for Bangladeshi students · Free to start</Kicker>
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
            <ul className="mt-3 flex list-none flex-wrap gap-x-7 gap-y-2 p-0">
              {SOURCES.map((s) => (
                <li key={s} className="font-display text-[22px] tracking-[-0.02em] text-ink/55">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <NextDeadlinesCard />
      </div>
    </section>
  );
}
