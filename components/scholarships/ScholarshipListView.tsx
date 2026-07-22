import type { Scholarship } from "@/data/scholarships";
import { groupByMonth } from "@/lib/scholarship-match";
import { ScholarshipCard } from "@/components/scholarships/ScholarshipCard";

export function ScholarshipListView({ scholarships }: { scholarships: Scholarship[] }) {
  const groups = groupByMonth(scholarships);

  return (
    <div className="flex flex-col gap-9">
      {groups.map((group) => (
        <div key={group.key}>
          <h3 className="font-label text-[12px] font-semibold uppercase tracking-[0.08em] text-sub">
            {group.label}
          </h3>
          <div className="mt-3.5 flex flex-col gap-4">
            {group.items.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
