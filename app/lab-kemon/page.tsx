import { Accent, PageHeader } from "@/components/PageHeader";
import { LabsExplorer } from "@/components/lab-kemon/LabsExplorer";
import { LABS } from "@/data/labs";

export default function LabKemonPage() {
  return (
    <>
      <PageHeader
        kicker="Find your Professor"
        title={
          <>
            Know the <Accent>lab</Accent> before you commit
          </>
        }
        description="Search professors and labs by university or field to see mentorship, funding, work-life balance and publishing scores — plus honest reviews from students who've actually been there."
        imageSrc="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80&auto=format&fit=crop"
        imageAlt="A mentor and student celebrating progress at a desk"
      />
      <LabsExplorer labs={LABS} />
    </>
  );
}
