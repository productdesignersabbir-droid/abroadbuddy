export function ScoreBar({
  label,
  value,
  size = "sm",
}: {
  label: string;
  value: number;
  size?: "sm" | "lg";
}) {
  const pct = Math.min(100, Math.max(0, (value / 5) * 100));

  if (size === "lg") {
    return (
      <div>
        <div className="flex items-center justify-between">
          <span className="font-body text-sm font-medium text-ink">{label}</span>
          <span className="font-body text-sm font-semibold text-ink">
            {value.toFixed(1)}
          </span>
        </div>
        <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-soft">
          <div
            className="h-full rounded-full bg-blue"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-label text-[10px] uppercase tracking-[0.06em] text-sub">
          {label}
        </span>
        <span className="font-label text-[10px] font-bold text-ink">
          {value.toFixed(1)}
        </span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-soft">
        <div
          className="h-full rounded-full bg-blue"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
