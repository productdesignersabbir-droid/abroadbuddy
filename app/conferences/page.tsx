import { ComingSoon } from "@/components/ComingSoon";
import { ROUTES } from "@/lib/routes";

const route = ROUTES.find((r) => r.href === "/conferences")!;

export default function ConferencesPage() {
  return <ComingSoon title={route.label} description={route.description} />;
}
