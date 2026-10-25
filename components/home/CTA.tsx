import { Button } from "@/components/ui/Button";
import { Accent } from "@/components/PageHeader";
import { FallbackImage } from "@/components/ui/FallbackImage";

const POINTS = ["Free to start", "Official sources", "Made for Bangladesh"];

export function CTA() {
  return (
    <section className="bg-paper px-6 pb-10 pt-4">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-ink px-8 py-16 sm:px-14 sm:py-20">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
          <FallbackImage
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80&auto=format&fit=crop"
            alt=""
            className="object-cover opacity-70"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/40 to-transparent" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(30,79,255,0.45), transparent 65%)" }}
        />

        <div className="relative max-w-140">
          <h2 className="font-display text-[clamp(38px,5vw,64px)] leading-[1.04] tracking-[-0.035em] text-white">
            Your journey abroad
            <br />
            starts with <Accent>one step.</Accent>
          </h2>
          <p className="mt-5 max-w-110 font-body text-[17px] leading-relaxed text-white/70">
            Five minutes. No sign-up. An honest look at where you stand and what to do next.
          </p>
          <Button href="/readiness" variant="primary" className="mt-8 px-6.5 py-3.5 text-[17px]">
            Check my readiness
          </Button>
          <ul className="mt-10 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2 font-body text-[14px] text-white/75">
                <span className="h-1.5 w-1.5 rounded-full bg-red" /> {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
