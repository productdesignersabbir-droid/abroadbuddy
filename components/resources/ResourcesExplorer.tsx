"use client";

import { useMemo, useState } from "react";
import type { CostOfLiving, FlightRoute, HousingListing } from "@/data/resources";
import { DEFAULT_DESTINATION, filterByDestination } from "@/lib/resource-match";
import { DestinationSelector } from "@/components/resources/DestinationSelector";
import { HousingSection } from "@/components/resources/HousingSection";
import { FlightsSection } from "@/components/resources/FlightsSection";
import { CostOfLivingSection } from "@/components/resources/CostOfLivingSection";

export function ResourcesExplorer({
  housing,
  flights,
  costOfLiving,
}: {
  housing: HousingListing[];
  flights: FlightRoute[];
  costOfLiving: CostOfLiving[];
}) {
  const [destination, setDestination] = useState(DEFAULT_DESTINATION);

  const filteredHousing = useMemo(
    () => filterByDestination(housing, destination),
    [housing, destination]
  );
  const filteredFlights = useMemo(
    () => filterByDestination(flights, destination),
    [flights, destination]
  );

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
        <DestinationSelector value={destination} onChange={setDestination} />
        <HousingSection listings={filteredHousing} />
        <FlightsSection routes={filteredFlights} />
        <CostOfLivingSection costs={costOfLiving} selectedDestination={destination} />
      </div>
    </section>
  );
}
