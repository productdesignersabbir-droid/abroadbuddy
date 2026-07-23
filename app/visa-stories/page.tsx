import { PageHeader } from "@/components/PageHeader";
import { VisaStoriesExplorer } from "@/components/visa-stories/VisaStoriesExplorer";
import { ShareVisaStoryButton } from "@/components/visa-stories/ShareVisaStoryButton";
import { VISA_STORIES } from "@/data/visa-stories";

export default function VisaStoriesPage() {
  return (
    <>
      <PageHeader
        kicker="Visa Information Hub"
        title="Real visa interviews, documents and outcomes — from students who lived them"
        description="Read honest, first-hand accounts of visa interviews and applications, filter by destination or outcome, and share your own once it's approved by our team."
        imageSrc="https://images.unsplash.com/photo-1517400508447-f8dd518b86db?w=800&q=80&auto=format&fit=crop"
        imageAlt="Traveler checking departures board at an airport terminal"
      >
        <ShareVisaStoryButton />
      </PageHeader>
      <VisaStoriesExplorer stories={VISA_STORIES} />
    </>
  );
}
