import { Accent, PageHeader } from "@/components/PageHeader";
import { UniversitiesExplorer } from "@/components/universities/UniversitiesExplorer";
import { UNIVERSITIES } from "@/data/universities";

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
        description="Filter by your CGPA, target country, major and budget to see a ranked shortlist of universities — with match scores that update as you adjust your criteria."
        imageSrc="https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1200&q=80&auto=format&fit=crop"
        imageAlt="Students studying in a bright glass-walled university library"
      />
      <UniversitiesExplorer universities={UNIVERSITIES} />
    </>
  );
}
