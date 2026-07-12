const ITEMS = [
  "IELTS Prep",
  "GRE Coaching",
  "SOP & LOR",
  "Scholarships",
  "Visa Guidance",
  "Housing",
];

export function TrustBar() {
  const looped = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden bg-ink py-3.5">
      <div className="animate-marquee flex w-max gap-11 whitespace-nowrap">
        {looped.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-11 font-label text-[13px] tracking-[0.06em] text-white/72"
          >
            {t} <span className="text-red">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
