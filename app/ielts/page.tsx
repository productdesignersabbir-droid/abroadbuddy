import { PageHeader } from "@/components/PageHeader";
import { MockTestsSection } from "@/components/ielts/MockTestsSection";
import { ProgressStrip } from "@/components/ielts/ProgressStrip";
import { CoachesExplorer } from "@/components/ielts/CoachesExplorer";
import { COACHES } from "@/data/ielts";

export default function IeltsPage() {
  return (
    <>
      <PageHeader
        kicker="IELTS prep"
        title="Free mock tests, plus real coaches for IELTS, GRE and beyond"
        description="Practice IELTS Listening, Reading, Writing and Speaking for free, track your band score, and book time with a specialist coach when you're ready to go further."
        imageSrc="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80&auto=format&fit=crop"
        imageAlt="Adult students attending an exam prep lecture in a classroom"
      />
      <section className="bg-soft py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
          <MockTestsSection />
          <ProgressStrip />
          <CoachesExplorer coaches={COACHES} />
        </div>
      </section>
    </>
  );
}
