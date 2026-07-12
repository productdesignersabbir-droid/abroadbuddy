import type { Lab } from "@/data/labs";
import { SUBSCORE_LABELS, getOverallRating } from "@/lib/lab-match";
import { FallbackImage } from "@/components/ui/FallbackImage";
import { ScoreBar } from "@/components/lab-kemon/ScoreBar";

export function LabCard({
  lab,
  onReadReviews,
}: {
  lab: Lab;
  onReadReviews: () => void;
}) {
  const overall = getOverallRating(lab);

  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-[0_2px_6px_rgba(11,18,32,0.04)] transition-shadow duration-200 hover:shadow-[0_18px_40px_-18px_rgba(11,18,32,0.22)]">
      <div className="relative h-36 w-full">
        <FallbackImage
          src={lab.imageSrc}
          alt={lab.imageAlt}
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-pill bg-white/95 px-2.75 py-1 shadow-sm backdrop-blur-sm">
          <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 16.9l-6.2 3.4 1.6-6.8L2.2 8.9l6.9-.6z"
              fill="#1E4FFF"
            />
          </svg>
          <span className="font-label text-[11px] font-bold tracking-[0.04em] text-blue">
            {overall.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
          {lab.department}
        </div>
        <h3 className="mt-1 font-display text-lg font-bold leading-snug text-ink">
          {lab.professor}
        </h3>
        <p className="mt-0.5 font-body text-[13px] text-sub">{lab.university}</p>

        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
          {SUBSCORE_LABELS.map(({ key, label }) => (
            <ScoreBar key={key} label={label} value={lab.subScores[key]} />
          ))}
        </div>

        <div className="mt-auto pt-4.5">
          <button
            type="button"
            onClick={onReadReviews}
            className="w-full rounded-button bg-blue px-4 py-2.25 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
          >
            Read reviews
          </button>
        </div>
      </div>
    </div>
  );
}
