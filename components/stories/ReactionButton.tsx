function SparkIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 16.9l-6.2 3.4 1.6-6.8L2.2 8.9l6.9-.6z"
        fill={filled ? "#FF3B47" : "none"}
        stroke="#FF3B47"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReactionButton({
  reacted,
  count,
  onToggle,
  size = "sm",
}: {
  reacted: boolean;
  count: number;
  onToggle: () => void;
  size?: "sm" | "lg";
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={reacted}
      className={`flex items-center gap-1.5 rounded-pill border-[1.5px] transition-colors ${
        reacted
          ? "border-red/40 bg-red/10 text-red"
          : "border-line text-sub hover:border-red/30 hover:text-red"
      } ${size === "lg" ? "px-4 py-2.25" : "px-3 py-1.5"}`}
    >
      <SparkIcon filled={reacted} />
      <span
        className={`font-body font-semibold ${size === "lg" ? "text-sm" : "text-[12.5px]"}`}
      >
        {count}
      </span>
      {size === "lg" && (
        <span className="font-body text-sm font-medium">Inspiring</span>
      )}
    </button>
  );
}
