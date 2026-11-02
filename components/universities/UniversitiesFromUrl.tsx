"use client";

import { UniversitiesExplorer } from "@/components/universities/UniversitiesExplorer";
import { WithSearchParams } from "@/components/ui/WithSearchParams";
import { COUNTRIES, MAJORS, UNIVERSITIES } from "@/data/universities";
import { DEFAULT_FILTERS, DEGREE_OPTIONS, type UniversityFilters } from "@/lib/university-match";

/** Lets other pages (like the readiness results) open the finder pre-filled. */
function filtersFrom(one: (key: string) => string | undefined): UniversityFilters {
  const country = one("country");
  const major = one("major");
  const cgpa = Number(one("cgpa"));
  const gpa = Number(one("gpa"));
  const degree = DEGREE_OPTIONS.find((d) => d.value === one("degree"))?.value;
  return {
    ...DEFAULT_FILTERS,
    degree: degree ?? DEFAULT_FILTERS.degree,
    gpa: gpa >= 3 && gpa <= 5 ? gpa : DEFAULT_FILTERS.gpa,
    country: country && (COUNTRIES as readonly string[]).includes(country) ? country : DEFAULT_FILTERS.country,
    major: major && (MAJORS as string[]).includes(major) ? major : DEFAULT_FILTERS.major,
    cgpa: cgpa >= 2 && cgpa <= 4 ? cgpa : DEFAULT_FILTERS.cgpa,
  };
}

export function UniversitiesFromUrl() {
  return (
    <WithSearchParams>
      {(get) => <UniversitiesExplorer universities={UNIVERSITIES} initialFilters={filtersFrom(get)} />}
    </WithSearchParams>
  );
}
