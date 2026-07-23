import { PageHeader } from "@/components/PageHeader";
import { ExamFormatSection } from "@/components/exam-prep/ExamFormatSection";
import { ExamTipsSection } from "@/components/exam-prep/ExamTipsSection";
import { ExamCoachesSection } from "@/components/exam-prep/ExamCoachesSection";
import { COACHES, GMAT_SECTIONS, GMAT_TIPS } from "@/data/ielts";

export default function GmatPage() {
  return (
    <>
      <PageHeader
        kicker="GMAT Prep"
        title="The GMAT Focus Edition, broken down section by section"
        description="See exactly what the GMAT Focus Edition tests, pick up prep tips built for it, and book a coach who specializes in Quant, Verbal or Data Insights."
        imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop"
        imageAlt="Business student reviewing charts and notes on a laptop"
      />
      <section className="bg-soft py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
          <ExamFormatSection
            sections={GMAT_SECTIONS}
            totalDurationLabel="Roughly 2 hours 15 minutes total, computer-delivered, with one optional break."
          />
          <ExamTipsSection tips={GMAT_TIPS} />
          <ExamCoachesSection examType="GMAT" coaches={COACHES} />
        </div>
      </section>
    </>
  );
}
