export function SectionHead({
  kicker,
  title,
  sub,
  kickerColor = "text-blue",
}: {
  kicker: string;
  title: string;
  sub?: string;
  kickerColor?: string;
}) {
  return (
    <div className="max-w-160">
      <div
        className={`font-label text-[12.5px] font-semibold uppercase tracking-[0.08em] ${kickerColor}`}
      >
        {kicker}
      </div>
      <h2 className="mt-3 font-display text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.1] tracking-[-0.025em] text-ink">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 font-body text-lg leading-relaxed text-sub">{sub}</p>
      )}
    </div>
  );
}
