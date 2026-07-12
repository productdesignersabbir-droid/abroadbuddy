import type { FlightRoute } from "@/data/resources";
import { formatFareRange } from "@/lib/resource-match";
import { IconPlane } from "@/components/home/icons";

export function FlightsSection({ routes }: { routes: FlightRoute[] }) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-blue/10">
          <IconPlane color="#1E4FFF" />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-ink">Flight fares from Dhaka</h2>
          <p className="font-body text-[13px] text-sub">
            Typical round-trip economy fares. Prices vary by season and how early you book.
          </p>
        </div>
      </div>

      {routes.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-card border border-line bg-white shadow-[0_2px_6px_rgba(11,18,32,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-140 border-collapse">
              <thead>
                <tr className="border-b border-line bg-soft">
                  <th className="px-5 py-3.5 text-left font-label text-[10.5px] font-semibold uppercase tracking-[0.06em] text-sub">
                    Route
                  </th>
                  <th className="px-5 py-3.5 text-left font-label text-[10.5px] font-semibold uppercase tracking-[0.06em] text-sub">
                    Typical stops
                  </th>
                  <th className="px-5 py-3.5 text-left font-label text-[10.5px] font-semibold uppercase tracking-[0.06em] text-sub">
                    Fare range
                  </th>
                  <th className="px-5 py-3.5 text-left font-label text-[10.5px] font-semibold uppercase tracking-[0.06em] text-sub">
                    Airlines
                  </th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route) => (
                  <tr key={route.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-4">
                      <div className="font-body text-sm font-semibold text-ink">
                        {route.from}
                        <span className="mx-1.5 text-sub">&rarr;</span>
                        {route.to}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-pill border border-line bg-soft px-2.5 py-1 font-label text-[10.5px] font-semibold tracking-[0.04em] text-sub">
                        {route.typicalStops}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-display text-sm font-bold text-ink">
                      {formatFareRange(route.fareMin, route.fareMax)}
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-body text-[13px] text-sub">
                        {route.airlines.join(", ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-card border border-dashed border-line bg-white px-6 py-10 text-center">
          <p className="font-body text-sm text-sub">
            No sample routes for this destination yet.
          </p>
        </div>
      )}
    </div>
  );
}
