import { Accent, PageHeader } from "@/components/PageHeader";
import { TopUniversitiesCarousel } from "@/components/universities/TopUniversitiesCarousel";
import { UniversitiesExplorer } from "@/components/universities/UniversitiesExplorer";
import { COUNTRIES, MAJORS, UNIVERSITIES } from "@/data/universities";
import { DEFAULT_FILTERS, DEGREE_OPTIONS, type UniversityFilters } from "@/lib/university-match";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/** Lets other pages (like the readiness results) open the finder pre-filled. */
function filtersFrom(params: Awaited<SearchParams>): UniversityFilters {
  const one = (k: string) => (typeof params[k] === "string" ? (params[k] as string) : undefined);
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

export default async function UniversitiesPage({ searchParams }: { searchParams: SearchParams }) {
  const initialFilters = filtersFrom(await searchParams);
  return (
    <>
      <PageHeader
        kicker="University Finder"
        title={
          <>
            Find the university that <Accent>actually</Accent> fits you
          </>
        }
        description={`Compare ${UNIVERSITIES.length} universities across ${COUNTRIES.length} countries. Pick your degree, then set your grades, destination, major and budget to see a ranked shortlist with admissions, costs, scholarships and visa details for each.`}
        media={<TopUniversitiesCarousel />}
      />
      <UniversitiesExplorer universities={UNIVERSITIES} initialFilters={initialFilters} />
    </>
  );
}
