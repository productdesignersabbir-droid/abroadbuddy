import { COUNTRY_INFO } from "@/data/universities";
import type { Lab } from "@/data/labs";
import {
  ACCEPTING_STYLES,
  SUBSCORE_LABELS,
  avatarTint,
  getOverallRating,
  initials,
} from "@/lib/lab-match";

export function Avatar({ lab, size = 56 }: { lab: Lab; size?: number }) {
  return (
    <span
      aria-hidden
      className="grid shrink-0 place-items-center rounded-full font-display text-ink"
      style={{
        width: size,
        height: size,
        background: avatarTint(lab.id),
        fontSize: size * 0.4,
      }}
    >
      {initials(lab.professor)}
    </span>
  );
}

export function StarRating({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-pill bg-soft px-2.5 py-1 font-body text-[13px] font-semibold text-ink">
      <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 16.9l-6.2 3.4 1.6-6.8L2.2 8.9l6.9-.6z"
          fill="#d99a2b"
        />
      </svg>
      {value.toFixed(1)}
    </span>
  );
}

export function LabCard({
  lab,
  onReadReviews,
}: {
  lab: Lab;
  onReadReviews: () => void;
}) {
  const overall = getOverallRating(lab);
  const status = ACCEPTING_STYLES[lab.accepting];

  return (
    <article className="flex flex-col rounded-[28px] bg-white p-5.5">
      <div className="flex items-start gap-3.5">
        <Avatar lab={lab} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-[24px] leading-tight tracking-[-0.02em] text-ink">
              {lab.professor}
            </h3>
            <StarRating value={overall} />
          </div>
          <p className="mt-0.5 font-body text-[13px] text-sub">
            {lab.title} · {lab.labName}
          </p>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-1.5 font-body text-[14px] font-medium text-ink">
        <span aria-hidden>{COUNTRY_INFO[lab.country].flag}</span>
        {lab.university}
      </p>

      <p className={`mt-2 flex items-center gap-2 font-body text-[13px] ${status.text}`}>
        <span className={`h-2 w-2 shrink-0 rounded-full ${status.dot}`} aria-hidden />
        <span className="shrink-0 whitespace-nowrap font-semibold">{status.label}</span>
        <span className="min-w-0 truncate text-sub">· {lab.acceptingNote}</span>
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {lab.researchAreas.map((a) => (
          <span key={a} className="rounded-pill bg-soft px-2.75 py-1 font-body text-[12.5px] text-ink">
            {a}
          </span>
        ))}
      </div>

      <dl className="mt-4 grid grid-cols-4 gap-1 rounded-[18px] bg-paper px-2 py-3">
        {SUBSCORE_LABELS.map(({ key, short }) => (
          <div key={key} className="text-center">
            <dd className="font-display text-[22px] leading-none text-ink">
              {lab.subScores[key].toFixed(1)}
            </dd>
            <dt className="mt-1 font-body text-[11.5px] text-sub">{short}</dt>
          </div>
        ))}
      </dl>

      <p className="mt-4 line-clamp-2 font-body text-[13.5px] leading-relaxed text-sub">
        <span className="font-medium text-ink">Funding:</span> {lab.fundingInfo}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="font-body text-[13px] text-sub">
          {lab.reviews.length} {lab.reviews.length === 1 ? "review" : "reviews"} · {lab.positions.join(", ")}
        </span>
        <button
          type="button"
          onClick={onReadReviews}
          className="shrink-0 rounded-button border-[1.5px] border-ink/80 px-4 py-2 font-body text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
        >
          View profile
        </button>
      </div>
    </article>
  );
}
