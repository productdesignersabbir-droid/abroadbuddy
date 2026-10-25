import { COUNTRY_INFO, type University } from "@/data/universities";
import {
  DIFFICULTY_STYLES,
  fitReasons,
  formatTuition,
  matchLabel,
  type UniversityFilters,
} from "@/lib/university-match";
import { FallbackImage } from "@/components/ui/FallbackImage";

export function MatchRing({ match, size = 76 }: { match: number; size?: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="36" cy="36" r={r} fill="none" stroke="var(--color-softer)" strokeWidth="6" />
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - match / 100)}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-[24px] leading-none text-ink">
          {match}
          <span className="font-body text-[11px] text-sub">%</span>
        </span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-body text-[12px] text-sub">{label}</dt>
      <dd className="mt-0.5 font-body text-[14.5px] font-semibold text-ink">{value}</dd>
    </div>
  );
}

export function UniversityCard({
  uni,
  match,
  filters,
  onViewDetails,
}: {
  uni: University;
  match: number;
  filters: UniversityFilters;
  onViewDetails: () => void;
}) {
  const info = COUNTRY_INFO[uni.country];
  const reasons = fitReasons(uni, filters);

  return (
    <article className="grid grid-cols-1 gap-2 rounded-[28px] bg-white p-2 md:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr_230px]">
      <div className="relative h-48 overflow-hidden rounded-[20px] md:h-full md:min-h-56">
        <FallbackImage
          src={uni.imageSrc}
          alt={uni.imageAlt}
          className="object-cover"
          sizes="(min-width: 768px) 260px, 100vw"
        />
        <span className="absolute left-3 top-3 rounded-pill bg-white/95 px-2.75 py-1 font-body text-[12px] font-semibold text-ink backdrop-blur-sm">
          World #{uni.worldRanking}
        </span>
      </div>

      <div className="flex flex-col px-3.5 py-3 md:py-4">
        <div className="flex items-center gap-1.5 font-body text-[13px] text-sub">
          <span aria-hidden>{info.flag}</span>
          {uni.city} · {uni.country}
        </div>
        <h3 className="mt-1 font-display text-[26px] leading-tight tracking-[-0.02em] text-ink">
          {uni.name}
        </h3>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <span className={`rounded-pill px-2.5 py-1 font-body text-[12px] font-medium ${DIFFICULTY_STYLES[uni.difficulty]}`}>
            {uni.difficulty}
          </span>
          <span className="rounded-pill bg-soft px-2.5 py-1 font-body text-[12px] font-medium text-ink">
            {uni.type}
          </span>
          <span className="rounded-pill bg-soft px-2.5 py-1 font-body text-[12px] font-medium text-ink">
            {uni.intakes.join(" · ")}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 font-body text-[14px] leading-relaxed text-sub">
          {uni.description}
        </p>

        <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4 sm:grid-cols-4">
          <Stat label="Tuition" value={formatTuition(uni.tuitionMin, uni.tuitionMax)} />
          <Stat label="Typical CGPA" value={`${uni.minCgpa.toFixed(2)}+`} />
          <Stat label="IELTS" value={`${uni.ielts.toFixed(1)}+`} />
          <Stat label="Acceptance" value={`~${uni.acceptanceRate}%`} />
        </dl>
      </div>

      <div className="flex flex-col gap-4 rounded-[20px] bg-paper p-4.5 md:col-span-2 xl:col-span-1">
        <div className="flex items-center gap-3.5">
          <MatchRing match={match} />
          <div>
            <div className="font-body text-[12px] text-sub">Profile fit</div>
            <div className="font-display text-[22px] leading-tight text-ink">{matchLabel(match)}</div>
          </div>
        </div>

        <ul className="grid list-none gap-1.5 p-0">
          {reasons.map((r) => (
            <li key={r.label} className="flex items-center gap-2 font-body text-[13px] text-ink">
              <span
                aria-hidden
                className={`grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                  r.ok ? "bg-blue/10 text-blue" : "bg-red/10 text-red"
                }`}
              >
                {r.ok ? "✓" : "!"}
              </span>
              {r.label}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex gap-2 xl:flex-col">
          <button
            type="button"
            onClick={onViewDetails}
            className="flex-1 rounded-button bg-ink px-4 py-2.5 font-body text-sm font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5"
          >
            View details
          </button>
          <a
            href={uni.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-button border-[1.5px] border-line bg-white px-4 py-2.25 text-center font-body text-sm font-semibold text-ink no-underline transition-colors hover:border-ink/40"
          >
            Official site ↗
          </a>
        </div>
      </div>
    </article>
  );
}
