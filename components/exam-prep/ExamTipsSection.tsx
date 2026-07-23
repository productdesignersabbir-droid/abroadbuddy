export function ExamTipsSection({ tips }: { tips: string[] }) {
  return (
    <div className="rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] sm:p-6.5">
      <h2 className="font-display text-xl font-bold text-ink">Prep tips</h2>
      <ul className="mt-4 grid gap-3.5">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
            <p className="font-body text-[14px] leading-relaxed text-sub">{tip}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
