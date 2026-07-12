import { Button } from "@/components/ui/Button";
import { FallbackImage } from "@/components/ui/FallbackImage";

export function CTA() {
  return (
    <section className="bg-soft px-6 pb-25 pt-5">
      <div className="relative mx-auto max-w-275 overflow-hidden rounded-[28px] px-10 py-15.5 text-center shadow-[0_30px_70px_-28px_rgba(30,79,255,0.5)]">
        <div className="absolute inset-0 z-0">
          <FallbackImage
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1400&q=80&auto=format&fit=crop"
            alt=""
            className="object-cover"
            sizes="(min-width: 1024px) 1100px, 100vw"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-linear-to-br from-blue/94 to-[#3358F5]/95" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-7.5 -top-15 z-0 h-60 w-60 blur-[6px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,59,71,.5), transparent 60%)",
          }}
        />
        <h2 className="relative z-10 font-display text-[clamp(28px,3.6vw,44px)] font-bold tracking-[-0.025em] text-white">
          Ready to start your journey?
        </h2>
        <p className="relative z-10 mx-auto mt-4 max-w-130 font-body text-[17.5px] text-white/90">
          Join thousands of Bangladeshi students turning &quot;someday, abroad&quot;
          into an offer letter.
        </p>
        <div className="relative z-10 mt-7.5 flex flex-wrap justify-center gap-3.5">
          <Button href="/universities" variant="white" className="px-6.5 py-3.5">
            Create free account
          </Button>
          <Button href="/mentors" variant="outline-light" className="px-6 py-3.25">
            Talk to a mentor
          </Button>
        </div>
      </div>
    </section>
  );
}
