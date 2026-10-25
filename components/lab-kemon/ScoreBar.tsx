export function ScoreBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const pct = Math.min(100, Math.max(0, (value / 5) * 100));

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-body text-sm text-ink">{label}</span>
        <span className="font-body text-sm font-semibold text-ink">
          {value.toFixed(1)}
        </span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-softer">
        <div className="h-full rounded-full bg-ink/70" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
