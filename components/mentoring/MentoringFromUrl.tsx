"use client";

import { MentoringExplorer } from "@/components/mentoring/MentoringExplorer";
import { WithSearchParams } from "@/components/ui/WithSearchParams";

/** ?type=research opens the research tab, e.g. from Find my research direction. */
export function MentoringFromUrl() {
  return (
    <WithSearchParams>
      {(get) => <MentoringExplorer initialType={get("type") === "research" ? "research" : "study"} />}
    </WithSearchParams>
  );
}
