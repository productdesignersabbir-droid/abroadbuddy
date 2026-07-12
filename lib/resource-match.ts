import type { CostOfLiving, DestinationId } from "@/data/resources";
import { DESTINATIONS } from "@/data/resources";

export const ALL_DESTINATIONS = "all";
export const DEFAULT_DESTINATION: string = ALL_DESTINATIONS;

export function filterByDestination<T extends { destinationId: DestinationId }>(
  items: T[],
  destinationId: string
): T[] {
  if (destinationId === ALL_DESTINATIONS) return items;
  return items.filter((item) => item.destinationId === destinationId);
}

export function getDestinationLabel(destinationId: string): string {
  return DESTINATIONS.find((d) => d.id === destinationId)?.label ?? "All destinations";
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number): string {
  return usd.format(amount);
}

export function formatCurrencyRange(min: number, max: number): string {
  return `${usd.format(min)}–${usd.format(max)}/mo`;
}

export function formatFareRange(min: number, max: number): string {
  return `${usd.format(min)}–${usd.format(max)}`;
}

export function totalMonthlyCost(cost: CostOfLiving): number {
  return cost.rent + cost.food + cost.transport + cost.utilities;
}

export const COST_CATEGORIES: {
  key: keyof Omit<CostOfLiving, "destinationId" | "city">;
  label: string;
  color: string;
}[] = [
  { key: "rent", label: "Rent", color: "bg-blue" },
  { key: "food", label: "Food", color: "bg-red" },
  { key: "transport", label: "Transport", color: "bg-ink/60" },
  { key: "utilities", label: "Utilities", color: "bg-blue/40" },
];
