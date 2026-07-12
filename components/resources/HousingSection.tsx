import type { HousingListing } from "@/data/resources";
import { HousingCard } from "@/components/resources/HousingCard";
import { IconHome } from "@/components/resources/icons";

export function HousingSection({ listings }: { listings: HousingListing[] }) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-blue/10">
          <IconHome color="#1E4FFF" />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-ink">Housing options</h2>
          <p className="font-body text-[13px] text-sub">
            Dorms, shared flats and studios near popular campuses.
          </p>
        </div>
      </div>

      {listings.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <HousingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-card border border-dashed border-line bg-white px-6 py-10 text-center">
          <p className="font-body text-sm text-sub">
            No sample listings for this destination yet.
          </p>
        </div>
      )}
    </div>
  );
}
