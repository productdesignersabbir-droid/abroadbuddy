import { SAMPLE_BAND_SCORES } from "@/data/ielts";

export function ProgressStrip() {
  const overall = (
    SAMPLE_BAND_SCORES.reduce((sum, s) => sum + s.band, 0) / SAMPLE_BAND_SCORES.length
  ).toFixed(1);

  return (
    <div className="rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] sm:p-6.5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-label text-[10.5px] font-semibold uppercase tracking-[0.06em] text-sub">
            Your progress
          </p>
          <p className="mt-1 font-body text-[13px] text-sub">
            Sample band scores from your last mock test
          </p>
        </div>
        <div className="flex items-center gap-2.5 rounded-pill bg-blue/10 px-4 py-2">
          <span className="font-label text-[10.5px] font-semibold uppercase tracking-[0.05em] text-blue">
            Overall band
          </span>
          <span className="font-display text-xl font-bold text-blue">{overall}</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SAMPLE_BAND_SCORES.map((s) => (
          <div key={s.section} className="rounded-xl bg-soft px-4 py-3.5 text-center">
            <p className="font-label text-[10px] font-semibold uppercase tracking-[0.05em] text-sub">
              {s.section}
            </p>
            <p className="mt-1 font-display text-lg font-bold text-ink">{s.band.toFixed(1)}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 font-body text-[12.5px] text-sub">
        This is sample data — take the free Reading test above to try real scoring.
      </p>
    </div>
  );
}
