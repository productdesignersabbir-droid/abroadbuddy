function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 16.9l-6.2 3.4 1.6-6.8L2.2 8.9l6.9-.6z"
        fill={filled ? "#1E4FFF" : "none"}
        stroke="#1E4FFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} filled={i < full} />
        ))}
      </div>
      <span className="font-body text-[13px] font-semibold text-ink">
        {rating.toFixed(1)}
      </span>
      <span className="font-body text-[12.5px] text-sub">({reviewCount})</span>
    </div>
  );
}
