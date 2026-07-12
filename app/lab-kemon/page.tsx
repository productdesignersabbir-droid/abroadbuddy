import { PageHeader } from "@/components/PageHeader";
import { LabsExplorer } from "@/components/lab-kemon/LabsExplorer";
import { LABS } from "@/data/labs";

export default function LabKemonPage() {
  return (
    <>
      <PageHeader
        kicker="Lab Kemon"
        title="Know the lab before you commit"
        description="Search professors and labs by university or field to see mentorship, funding, work-life balance and publishing scores — plus honest reviews from students who've actually been there."
        imageSrc="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80&auto=format&fit=crop"
        imageAlt="Scientific equipment and test tubes in a research laboratory"
      />
      <LabsExplorer labs={LABS} />
    </>
  );
}
