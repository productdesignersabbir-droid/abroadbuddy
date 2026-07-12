import { Button } from "@/components/ui/Button";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
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
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2.25 rounded-pill border border-line bg-soft px-3.25 py-1.75 font-label text-[12.5px] font-medium uppercase tracking-[0.04em] text-ink">
          <span className="inline-block h-1.75 w-1.75 rounded-full bg-red" />
          Boarding soon
        </div>
        <h1 className="mt-5 font-display text-[clamp(32px,4.4vw,48px)] font-bold tracking-[-0.025em] text-ink">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-120 font-body text-lg leading-relaxed text-sub">
          {description}
        </p>
        <div className="mx-auto mt-9 max-w-90 rounded-card border border-dashed border-line bg-soft px-6 py-8 font-label text-sm uppercase tracking-[0.08em] text-sub">
          This gate is still boarding — page in progress
        </div>
        <div className="mt-9">
          <Button href="/" variant="primary" className="px-6 py-3.25">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
