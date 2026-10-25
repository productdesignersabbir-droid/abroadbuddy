import type { Scholarship } from "@/data/scholarships";
import { CLOSING_SOON_DAYS, isClosingSoon } from "@/lib/scholarship-match";

export function ScholarshipStats({ scholarships }: { scholarships: Scholarship[] }) {
  const stats = [
    { value: scholarships.length, label: "Scholarships" },
    {
      value: new Set(scholarships.map((s) => s.country)).size,
      label: "Countries",
    },
    {
      value: scholarships.filter((s) => s.fundingType === "Fully Funded").length,
      label: "Fully funded",
    },
    {
      value: scholarships.filter((s) => isClosingSoon(s.deadline)).length,
      label: `Closing in ${CLOSING_SOON_DAYS} days`,
      urgent: true,
    },
  ];

  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-card bg-white px-5 py-4.5"
        >
          <dd
            className={`font-display text-[46px] leading-none tracking-[-0.03em] ${
              stat.urgent ? "text-red" : "text-ink"
            }`}
          >
            {stat.value}
          </dd>
          <dt className="mt-2 font-label text-[11px] uppercase tracking-[0.08em] text-sub">
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
