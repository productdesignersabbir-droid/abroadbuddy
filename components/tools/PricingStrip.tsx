import { CheckIcon } from "@/components/home/icons";

type Tier = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Free AI drafts",
    price: "$0",
    cadence: "always free",
    description: "Get a solid first draft in minutes with our template-guided AI.",
    features: [
      "Unlimited CV & LOR drafts",
      "Basic SOP drafting",
      "Copy & edit anywhere",
    ],
  },
  {
    name: "Premium AI",
    price: "$9",
    cadence: "per month",
    description: "Sharper, more personalized drafts across every document type.",
    features: [
      "Everything in Free",
      "Premium SOP generator",
      "Multiple tone & length options",
      "Priority draft regenerations",
    ],
    highlighted: true,
  },
  {
    name: "Human specialist",
    price: "From $35",
    cadence: "per document",
    description: "Work 1:1 with a vetted writer who knows your program inside out.",
    features: [
      "Dedicated specialist match",
      "Unlimited revisions with your writer",
      "Reviewed for tone, structure & fit",
    ],
  },
];

export function PricingStrip() {
  return (
    <section className="bg-soft py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-140">
          <div className="inline-flex items-center gap-2.25 rounded-pill border border-line bg-white px-3.25 py-1.75 font-label text-[12.5px] font-medium uppercase tracking-[0.04em] text-ink">
            <span className="inline-block h-1.75 w-1.75 rounded-full bg-red" />
            Pick what fits
          </div>
          <h2 className="mt-4.5 font-display text-[clamp(26px,3.2vw,36px)] font-bold leading-[1.1] tracking-[-0.025em] text-ink">
            Free to start. Upgrade when it counts.
          </h2>
          <p className="mt-3.5 font-body text-[15.5px] leading-relaxed text-sub">
            Start with a free AI draft, upgrade to premium AI for sharper output, or
            bring in a human specialist for the documents that matter most.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-card border p-6 ${
                tier.highlighted
                  ? "border-blue bg-white shadow-[0_20px_50px_-20px_rgba(30,79,255,0.35)]"
                  : "border-line bg-white shadow-[0_2px_6px_rgba(11,18,32,0.04)]"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-6 rounded-pill bg-blue px-2.75 py-1 font-label text-[10.5px] font-semibold tracking-[0.04em] text-white">
                  MOST POPULAR
                </span>
              )}
              <h3 className="font-display text-base font-bold text-ink">{tier.name}</h3>
              <div className="mt-2.5 flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-bold text-ink">
                  {tier.price}
                </span>
                <span className="font-body text-[13px] text-sub">{tier.cadence}</span>
              </div>
              <p className="mt-2.5 font-body text-[13.5px] leading-relaxed text-sub">
                {tier.description}
              </p>
              <ul className="mt-4.5 space-y-2.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="font-body text-[13.5px] leading-snug text-ink">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
