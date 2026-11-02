"use client";

import { ApplicationStudio } from "@/components/application-studio/ApplicationStudio";
import { WithSearchParams } from "@/components/ui/WithSearchParams";
import type { DocId, StudioDegree } from "@/data/application-studio";

const DOCS: DocId[] = ["cv", "statement", "proposal", "reference"];
const DEGREES: StudioDegree[] = ["bachelors", "masters", "phd"];

/** Other pages can open a specific document, e.g. ?doc=proposal. */
export function ApplicationStudioFromUrl() {
  return (
    <WithSearchParams>
      {(get) => {
        const initialDoc = DOCS.find((d) => d === get("doc"));
        const initialDegree = DEGREES.find((d) => d === get("degree"));
        return (
          <ApplicationStudio
            initialDoc={initialDoc}
            initialDegree={initialDoc === "proposal" && !initialDegree ? "phd" : initialDegree}
          />
        );
      }}
    </WithSearchParams>
  );
}
