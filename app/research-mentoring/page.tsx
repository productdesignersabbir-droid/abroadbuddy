import { PageHeader } from "@/components/PageHeader";
import { ResearchMentorsExplorer } from "@/components/research-mentoring/ResearchMentorsExplorer";
import { RESEARCH_MENTORS } from "@/data/research-mentors";

export default function ResearchMentoringPage() {
  return (
    <>
      <PageHeader
        kicker="1:1 Research Mentoring"
        title="Paid, one-to-one guidance from topic selection to publication"
        description="Work directly with researchers and trainers across social science, public health, data science, engineering and more. Pick a mentor, see their full profile, and book a paid consultation at a time that works for you."
        imageSrc="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80&auto=format&fit=crop"
        imageAlt="Researcher reviewing notes and a laptop at a desk"
      />
      <ResearchMentorsExplorer mentors={RESEARCH_MENTORS} />
    </>
  );
}
