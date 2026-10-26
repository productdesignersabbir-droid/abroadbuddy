import { Accent, PageHeader } from "@/components/PageHeader";
import { ResearchDirectionFinder } from "@/components/research-direction/ResearchDirectionFinder";

export default function ResearchDirectionPage() {
  return (
    <>
      <PageHeader
        kicker="Find my research direction"
        title={
          <>
            Turn your curiosity into a <Accent>research</Accent> question
          </>
        }
        description="You don't need a paper or a lab to start. Pick your subject, say what it's for and what you can work with, and get three directions you can begin this month."
        imageSrc="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80&auto=format&fit=crop"
        imageAlt="Grand reading room in a library"
      />
      <ResearchDirectionFinder />
    </>
  );
}
