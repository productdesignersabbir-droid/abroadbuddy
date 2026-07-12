import { ComingSoon } from "@/components/ComingSoon";
import { ROUTES } from "@/lib/routes";

const route = ROUTES.find((r) => r.href === "/ielts")!;

export default function IeltsPage() {
  return <ComingSoon title={route.label} description={route.description} />;
}
