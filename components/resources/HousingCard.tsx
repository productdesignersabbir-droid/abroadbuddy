import type { HousingListing } from "@/data/resources";
import { formatCurrencyRange, getDestinationLabel } from "@/lib/resource-match";
import { FallbackImage } from "@/components/ui/FallbackImage";
import { CheckIcon } from "@/components/home/icons";

const TYPE_STYLES: Record<HousingListing["type"], string> = {
  Dorm: "bg-red/10 text-red",
  "Shared apartment": "bg-blue/10 text-blue",
  Studio: "bg-ink/8 text-ink",
};

export function HousingCard({ listing }: { listing: HousingListing }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-[0_2px_6px_rgba(11,18,32,0.04)] transition-shadow duration-200 hover:shadow-[0_18px_40px_-18px_rgba(11,18,32,0.22)]">
      <div className="relative h-40 w-full">
        <FallbackImage
          src={listing.imageSrc}
          alt={listing.imageAlt}
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute left-3 top-3">
          <span
            className={`rounded-pill px-2.5 py-1 font-label text-[10.5px] font-semibold tracking-[0.04em] ${TYPE_STYLES[listing.type]}`}
          >
            {listing.type.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
          {listing.area} · {getDestinationLabel(listing.destinationId)}
        </div>
        <h3 className="mt-1 font-display text-lg font-bold leading-snug text-ink">
          {listing.title}
        </h3>

        <ul className="mt-3.5 flex flex-col gap-2">
          {listing.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-2.5">
              <CheckIcon />
              <span className="font-body text-[13px] leading-snug text-sub">{perk}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-4.5">
          <div className="border-t border-line pt-4">
            <div className="font-label text-[10px] uppercase tracking-[0.08em] text-sub">
              Monthly rent
            </div>
            <div className="font-display text-[15px] font-bold text-ink">
              {formatCurrencyRange(listing.rentMin, listing.rentMax)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
