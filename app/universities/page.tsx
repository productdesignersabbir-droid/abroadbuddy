import { PageHeader } from "@/components/PageHeader";
import { UniversitiesExplorer } from "@/components/universities/UniversitiesExplorer";
import { UNIVERSITIES } from "@/data/universities";

export default function UniversitiesPage() {
  return (
    <>
      <PageHeader
        kicker="University search"
        title="Find the university that actually fits you"
        description="Filter by your CGPA, target country, major and budget to see a ranked shortlist of universities — with match scores that update as you adjust your criteria."
        imageSrc="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80&auto=format&fit=crop"
        imageAlt="Airport departure terminal with travellers walking past large windows"
      />
      <UniversitiesExplorer universities={UNIVERSITIES} />
    </>
  );
}
