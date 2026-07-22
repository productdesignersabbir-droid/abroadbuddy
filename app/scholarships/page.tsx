import { PageHeader } from "@/components/PageHeader";
import { ScholarshipsExplorer } from "@/components/scholarships/ScholarshipsExplorer";
import { SCHOLARSHIPS } from "@/data/scholarships";

export default function ScholarshipsPage() {
  return (
    <>
      <PageHeader
        kicker="Scholarship Calendar"
        title="Every upcoming scholarship deadline, in one calendar"
        description="Browse fully funded and partial scholarships month by month, filter by country, degree level and your CGPA, and open a full detail page before you apply."
        imageSrc="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80&auto=format&fit=crop"
        imageAlt="Students walking across a sunny university campus"
      />
      <ScholarshipsExplorer scholarships={SCHOLARSHIPS} />
    </>
  );
}
