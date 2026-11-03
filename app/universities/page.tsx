import { Accent, PageHeader } from "@/components/PageHeader";
import { TopUniversitiesCarousel } from "@/components/universities/TopUniversitiesCarousel";
import { UniversitiesFromUrl } from "@/components/universities/UniversitiesFromUrl";
import { COUNTRIES, UNIVERSITIES } from "@/data/universities";

export default function UniversitiesPage() {
  return (
    <>
      <PageHeader
        kicker="University Finder"
        title={
          <>
            Find the university that <Accent>actually</Accent> fits you
          </>
        }
        description={`Compare ${UNIVERSITIES.length.toLocaleString("en-US")} universities across ${COUNTRIES.length} countries. Pick your degree, then set your grades, destination, major and budget to see a ranked shortlist with admissions, costs, scholarships and visa details for each.`}
        media={<TopUniversitiesCarousel />}
      />
      <UniversitiesFromUrl />
    </>
  );
}
