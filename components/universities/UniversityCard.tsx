import type { University } from "@/data/universities";
import { DIFFICULTY_STYLES, formatTuition } from "@/lib/university-match";
import { FallbackImage } from "@/components/ui/FallbackImage";

export function UniversityCard({
  uni,
  match,
  onViewDetails,
}: {
  uni: University;
  match: number;
  onViewDetails: () => void;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-[0_2px_6px_rgba(11,18,32,0.04)] transition-shadow duration-200 hover:shadow-[0_18px_40px_-18px_rgba(11,18,32,0.22)]">
      <div className="relative h-40 w-full">
        <FallbackImage
          src={uni.imageSrc}
          alt={uni.imageAlt}
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute right-3 top-3 rounded-pill bg-white/95 px-2.75 py-1 shadow-sm backdrop-blur-sm">
          <span className="font-label text-[11px] font-bold tracking-[0.04em] text-blue">
            {match}% MATCH
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
          {uni.city}
        </div>
        <h3 className="mt-1 font-display text-lg font-bold leading-snug text-ink">
          {uni.name}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-pill border border-line bg-soft px-2.5 py-1 font-label text-[10.5px] font-semibold tracking-[0.04em] text-ink">
            {uni.country}
          </span>
          <span className="rounded-pill border border-line bg-soft px-2.5 py-1 font-label text-[10.5px] font-semibold tracking-[0.04em] text-ink">
            QS #{uni.qsRank}
          </span>
          <span className="rounded-pill border border-line bg-soft px-2.5 py-1 font-label text-[10.5px] font-semibold tracking-[0.04em] text-ink">
            THE #{uni.theRank}
          </span>
          <span
            className={`rounded-pill border px-2.5 py-1 font-label text-[10.5px] font-semibold tracking-[0.04em] ${DIFFICULTY_STYLES[uni.difficulty]}`}
          >
            {uni.difficulty}
          </span>
        </div>

        <p className="mt-3.5 line-clamp-2 font-body text-[13.5px] leading-relaxed text-sub">
          {uni.description}
        </p>

        <div className="mt-auto pt-4.5">
          <div className="flex items-center justify-between border-t border-line pt-4">
            <div>
              <div className="font-label text-[10px] uppercase tracking-[0.08em] text-sub">
                Tuition
              </div>
              <div className="font-display text-[15px] font-bold text-ink">
                {formatTuition(uni.tuitionMin, uni.tuitionMax)}
              </div>
            </div>
            <button
              type="button"
              onClick={onViewDetails}
              className="rounded-button bg-blue px-4 py-2.25 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
            >
              View details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
