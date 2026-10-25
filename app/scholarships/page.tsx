import { Accent, PageHeader } from "@/components/PageHeader";
import { ScholarshipsExplorer } from "@/components/scholarships/ScholarshipsExplorer";
import { SCHOLARSHIPS } from "@/data/scholarships";

export default function ScholarshipsPage() {
  return (
    <>
      <PageHeader
        kicker="Scholarship Calendar"
        title={
          <>
            Every scholarship deadline, in <Accent>one</Accent> calendar
          </>
        }
        description="Browse fully funded and partial scholarships month by month, filter by country, degree level and your CGPA, and open a full detail page before you apply."
        imageSrc="https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=1200&q=80&auto=format&fit=crop"
        imageAlt="Graduates in caps and gowns at a ceremony at sunset"
      />
      <ScholarshipsExplorer scholarships={SCHOLARSHIPS} />
    </>
  );
}
