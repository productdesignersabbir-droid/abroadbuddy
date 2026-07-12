import { Button } from "@/components/ui/Button";
import { BoardingPass } from "@/components/home/BoardingPass";
import { FallbackImage } from "@/components/ui/FallbackImage";

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-[26px] font-bold tracking-[-0.02em] text-ink">
        {n}
      </div>
      <div className="mt-0.5 font-body text-[13.5px] text-sub">{l}</div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-30 -top-40 h-120 w-120 rounded-full blur-[10px]"
        style={{
          background:
            "radial-gradient(circle, rgba(30,79,255,0.14), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-45 -left-35 h-115 w-115 rounded-full blur-[10px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,59,71,0.10), transparent 60%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-21 pt-18 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="inline-flex items-center gap-2.25 rounded-pill border border-line bg-soft px-3.25 py-1.75 font-label text-[12.5px] font-medium uppercase tracking-[0.04em] text-ink">
            <span className="inline-block h-1.75 w-1.75 rounded-full bg-red" />
            Built for Bangladeshi students
          </div>

          <h1 className="mt-4.5 font-display text-[clamp(38px,5.4vw,62px)] font-bold leading-[1.04] tracking-[-0.03em] text-ink">
            Your whole study-abroad journey,{" "}
            <span className="relative inline-block text-blue">
              one platform
              <svg
                aria-hidden
                width="100%"
                height="12"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 w-full"
              >
                <path
                  d="M2 8 Q 60 2 100 6 T 198 5"
                  stroke="#FF3B47"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h1>

          <p className="mt-5.5 max-w-130 font-body text-lg leading-relaxed text-sub">
            Find universities that fit your profile, build a standout application,
            meet mentors who&apos;ve done it, and know the lab culture before you
            commit.
          </p>

          <div className="mt-7.5 flex flex-wrap gap-3.5">
            <Button href="/universities" variant="primary" className="px-6 py-3.5 text-base">
              Match my universities
            </Button>
            <Button href="/tools" variant="ghost" className="px-5.5 py-3 text-base">
              Explore features
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-7">
            <Stat n="500+" l="Universities" />
            <Stat n="120+" l="Verified mentors" />
            <Stat n="4.9★" l="Student rating" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -bottom-8 -right-5 z-0 hidden w-40 -rotate-6 rounded-[14px] border-4 border-white bg-white p-1.5 shadow-[0_20px_45px_-15px_rgba(11,18,32,0.35)] sm:block">
            <div className="relative h-28 w-full overflow-hidden rounded-[8px]">
              <FallbackImage
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80&auto=format&fit=crop"
                alt="Airplane wing above clouds at sunset"
                sizes="160px"
              />
            </div>
          </div>
          <div className="relative z-10">
            <BoardingPass />
          </div>
        </div>
      </div>
    </section>
  );
}
