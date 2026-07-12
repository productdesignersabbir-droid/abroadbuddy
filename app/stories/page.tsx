import { PageHeader } from "@/components/PageHeader";
import { StoriesExplorer } from "@/components/stories/StoriesExplorer";
import { ShareStoryButton } from "@/components/stories/ShareStoryButton";
import { STORIES } from "@/data/stories";

export default function StoriesPage() {
  return (
    <>
      <PageHeader
        kicker="Journey Stories"
        title="Real journeys, told by the students who lived them"
        description="Read honest, first-hand accounts of applying, funding, and moving abroad — filter by country or field, then share your own once you land."
        imageSrc="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format&fit=crop"
        imageAlt="Student boarding a flight with a backpack, walking toward the gate"
      >
        <ShareStoryButton />
      </PageHeader>
      <StoriesExplorer stories={STORIES} />
    </>
  );
}
