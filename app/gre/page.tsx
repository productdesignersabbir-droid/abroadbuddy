import { PageHeader } from "@/components/PageHeader";
import { ExamFormatSection } from "@/components/exam-prep/ExamFormatSection";
import { ExamTipsSection } from "@/components/exam-prep/ExamTipsSection";
import { ExamCoachesSection } from "@/components/exam-prep/ExamCoachesSection";
import { COACHES, GRE_SECTIONS, GRE_TIPS } from "@/data/ielts";

export default function GrePage() {
  return (
    <>
      <PageHeader
        kicker="GRE Prep"
        title="Know the GRE format, then train with a coach who's scored it"
        description="A quick breakdown of every GRE section, practical prep tips, and specialist coaches for Verbal, Quant and Analytical Writing."
        imageSrc="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80&auto=format&fit=crop"
        imageAlt="Student studying with a laptop and notebook at a desk"
      />
      <section className="bg-soft py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
          <ExamFormatSection
            sections={GRE_SECTIONS}
            totalDurationLabel="Roughly 2 hours total, computer-delivered, with a 10-minute break."
          />
          <ExamTipsSection tips={GRE_TIPS} />
          <ExamCoachesSection examType="GRE" coaches={COACHES} />
        </div>
      </section>
    </>
  );
}
