import type { CostOfLiving } from "@/data/resources";
import { COST_CATEGORIES, formatCurrency, totalMonthlyCost } from "@/lib/resource-match";
import { IconWallet } from "@/components/resources/icons";

export function CostOfLivingSection({
  costs,
  selectedDestination,
}: {
  costs: CostOfLiving[];
  selectedDestination: string;
}) {
  const maxTotal = Math.max(...costs.map(totalMonthlyCost));

  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-blue/10">
          <IconWallet color="#1E4FFF" />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-ink">Cost of living</h2>
          <p className="font-body text-[13px] text-sub">
            Estimated monthly costs per student, in USD.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] sm:p-6.5">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {COST_CATEGORIES.map((category) => (
            <span
              key={category.key}
              className="inline-flex items-center gap-1.5 font-label text-[10.5px] font-semibold uppercase tracking-[0.06em] text-sub"
            >
              <span className={`h-2.5 w-2.5 rounded-full ${category.color}`} />
              {category.label}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-4">
          {costs.map((cost) => {
            const total = totalMonthlyCost(cost);
            const barWidthPercent = (total / maxTotal) * 100;
            const isSelected = cost.destinationId === selectedDestination;

            return (
              <div
                key={cost.destinationId}
                className={`flex flex-col gap-2 rounded-xl p-2.5 transition-colors sm:flex-row sm:items-center sm:gap-4 ${
                  isSelected ? "bg-blue/6 ring-1 ring-blue/25" : ""
                }`}
              >
                <div className="w-full shrink-0 font-body text-sm font-semibold text-ink sm:w-32">
                  {cost.city}
                </div>
                <div className="h-6 w-full shrink-0 overflow-hidden rounded-pill bg-soft sm:w-auto sm:flex-1">
                  <div
                    className="flex h-full"
                    style={{ width: `${barWidthPercent}%` }}
                  >
                    {COST_CATEGORIES.map((category) => (
                      <div
                        key={category.key}
                        className={category.color}
                        style={{ width: `${(cost[category.key] / total) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="w-full shrink-0 text-left font-display text-sm font-bold text-ink sm:w-24 sm:text-right">
                  {formatCurrency(total)}
                  <span className="ml-1 font-body text-[11px] font-normal text-sub">/mo</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
