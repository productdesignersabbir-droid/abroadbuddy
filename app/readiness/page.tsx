import { Accent, PageHeader } from "@/components/PageHeader";
import { ReadinessQuiz } from "@/components/readiness/ReadinessQuiz";

export default function ReadinessPage() {
  return (
    <>
      <PageHeader
        kicker="Study Abroad Readiness"
        title={
          <>
            How <Accent>ready</Accent> are you to study abroad?
          </>
        }
        description="Answer five quick questions about your CGPA, English test, research, budget and documents. You'll get a readiness score and a to-do list for what to work on next."
        imageSrc="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=80&auto=format&fit=crop"
        imageAlt="Three students looking at a tablet together"
      />
      <ReadinessQuiz />
    </>
  );
}
