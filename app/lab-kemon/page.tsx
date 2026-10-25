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
        description="Browse 43 labs in 26 countries. Search by professor, university or research topic to see who is taking students, what funding looks like, and what past students say."
        imageSrc="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80&auto=format&fit=crop"
        imageAlt="A mentor and student celebrating progress at a desk"
      />
      <LabsExplorer labs={LABS} />
    </>
  );
}
