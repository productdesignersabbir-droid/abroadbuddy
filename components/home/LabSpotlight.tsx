"use client";

import { useReveal } from "@/lib/use-reveal";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/home/icons";
import { FallbackImage } from "@/components/ui/FallbackImage";

const POINTS = [
  "Professor behaviour & mentorship ratings",
  "Funding, stipend & assistantship insight",
  "Real reviews from current lab members",
];

const RATINGS: [string, number, "blue" | "red"][] = [
  ["Mentorship", 92, "blue"],
  ["Funding", 78, "red"],
  ["Work-life", 84, "blue"],
  ["Publishing", 88, "red"],
];

function LabReviewCard() {
  return (
    <div className="rounded-[22px] border border-line bg-soft p-5.5 shadow-[0_24px_50px_-24px_rgba(11,18,32,0.2)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-line">
            <FallbackImage
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80&auto=format&fit=crop"
              alt="Portrait of Dr. A. Rahman"
              sizes="44px"
            />
          </div>
          <div>
            <div className="font-display text-lg font-bold text-ink">
              Systems & AI Lab
            </div>
            <div className="mt-0.5 font-body text-[13.5px] text-sub">
              Dr. A. Rahman · Purdue University
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-line bg-white px-3 py-2 text-center">
          <div className="font-display text-xl font-bold text-blue">4.6</div>
          <div className="font-label text-[9.5px] tracking-[0.06em] text-sub">
            OVERALL
          </div>
        </div>
      </div>

      <div className="mt-4.5 grid grid-cols-2 gap-2.5">
        {RATINGS.map(([k, v, col]) => (
          <div key={k} className="rounded-xl border border-line bg-white px-3.25 py-3">
            <div className="flex justify-between font-body text-[12.5px] text-sub">
              <span>{k}</span>
              <span className="font-bold text-ink">{v}%</span>
            </div>
            <div className="mt-1.75 h-1.5 overflow-hidden rounded-pill bg-softer">
              <div
                className="h-full rounded-pill"
                style={{
                  width: `${v}%`,
                  background: col === "blue" ? "#1E4FFF" : "#FF3B47",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-line bg-white px-3.75 py-3.5">
        <p className="font-body text-[13.5px] leading-relaxed text-ink">
          &quot;Supportive advisor, guaranteed funding for 5 years, and a
          collaborative group. Expect long weeks near deadlines.&quot;
        </p>
        <div className="mt-2.25 font-label text-[11px] tracking-[0.04em] text-sub">
          — PhD student, 2nd year
        </div>
      </div>
    </div>
  );
}

export function LabSpotlight() {
  const [ref, seen] = useReveal<HTMLDivElement>();

  return (
    <section className="bg-paper py-22.5">
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-13.5 px-6 lg:grid-cols-2"
      >
        <div
          style={{
            opacity: seen ? 1 : 0,
            transform: seen ? "none" : "translateX(-20px)",
          }}
          className="transition-all duration-600"
        >
          <div className="inline-flex items-center gap-2.25 rounded-pill border border-red/20 bg-red/8 px-3.25 py-1.75 font-label text-[12.5px] font-medium uppercase tracking-[0.04em] text-ink">
            <span className="inline-block h-1.75 w-1.75 rounded-full bg-red" />
            The EasiAbroad difference
          </div>
          <h2 className="mt-4.5 font-display text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-0.025em] text-ink">
            Know the lab <span className="text-red">before</span> you commit.
          </h2>
          <p className="mt-4.5 max-w-120 font-body text-[17px] leading-relaxed text-sub">
            <strong className="text-ink">Find your Professor</strong> lets you see professor
            ratings, funding and stipend info, and honest reviews of lab culture —
            so you never walk into a supervisor mismatch after moving across the
            world.
          </p>
          <ul className="mt-5.5 grid list-none gap-3 p-0">
            {POINTS.map((t) => (
              <li
                key={t}
                className="flex items-center gap-2.75 font-body text-[15px] text-ink"
              >
                <CheckIcon /> {t}
              </li>
            ))}
          </ul>
          <Button href="/lab-kemon" variant="primary" className="mt-7 px-5.5 py-3.25">
            Find your professor
          </Button>
        </div>

        <div
          style={{
            opacity: seen ? 1 : 0,
            transform: seen ? "none" : "translateX(20px)",
          }}
          className="transition-all delay-100 duration-600"
        >
          <LabReviewCard />
        </div>
      </div>
    </section>
  );
}
