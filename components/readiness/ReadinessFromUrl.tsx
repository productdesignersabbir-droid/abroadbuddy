"use client";

import type { ReactNode } from "react";
import { ReadinessQuiz } from "@/components/readiness/ReadinessQuiz";
import { WithSearchParams } from "@/components/ui/WithSearchParams";

const DEGREES = ["bachelors", "masters", "phd"] as const;

/** University Finder links here with the degree already chosen. */
export function ReadinessFromUrl({ header }: { header: ReactNode }) {
  return (
    <WithSearchParams>
      {(get) => <ReadinessQuiz initialDegree={DEGREES.find((d) => d === get("degree"))} header={header} />}
    </WithSearchParams>
  );
}
