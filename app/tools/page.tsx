import { ComingSoon } from "@/components/ComingSoon";
import { ROUTES } from "@/lib/routes";

const route = ROUTES.find((r) => r.href === "/tools")!;

export default function ToolsPage() {
  return <ComingSoon title={route.label} description={route.description} />;
}
