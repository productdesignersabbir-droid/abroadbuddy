import { PageHeader } from "@/components/PageHeader";
import { ResourcesExplorer } from "@/components/resources/ResourcesExplorer";
import { HOUSING_LISTINGS, FLIGHT_ROUTES, COST_OF_LIVING } from "@/data/resources";

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        kicker="Housing & Flights"
        title="Abroad housing, flight fares and cost of living, in one place"
        description="Research where you'll live, what it costs to get there, and what a monthly budget looks like — before you book anything."
        imageSrc="https://images.unsplash.com/photo-1517400508447-f8dd518b86db?w=800&q=80&auto=format&fit=crop"
        imageAlt="Traveler checking departures board at an airport terminal"
      />
      <ResourcesExplorer
        housing={HOUSING_LISTINGS}
        flights={FLIGHT_ROUTES}
        costOfLiving={COST_OF_LIVING}
      />
    </>
  );
}
