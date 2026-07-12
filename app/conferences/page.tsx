import { PageHeader } from "@/components/PageHeader";
import { ConferencesExplorer } from "@/components/conferences/ConferencesExplorer";
import { CONFERENCES } from "@/data/conferences";

export default function ConferencesPage() {
  return (
    <>
      <PageHeader
        kicker="Conference Calendar"
        title="Local and global conferences, research fests and paper deadlines"
        description="Track submission deadlines for conferences and journals across Bangladesh and abroad, so you never miss a call for papers."
        imageSrc="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80&auto=format&fit=crop"
        imageAlt="Speaker presenting on stage at a conference in front of a large audience"
      />
      <ConferencesExplorer conferences={CONFERENCES} />
    </>
  );
}
