import { ComingSoon } from "@/components/ComingSoon";
import { ROUTES } from "@/lib/routes";

const route = ROUTES.find((r) => r.href === "/resources")!;

export default function ResourcesPage() {
  return <ComingSoon title={route.label} description={route.description} />;
}
