import { Accent, PageHeader } from "@/components/PageHeader";
import { ConferencesExplorer } from "@/components/conferences/ConferencesExplorer";
import { CONFERENCES } from "@/data/conferences";

export default function ConferencesPage() {
  return (
    <>
      <PageHeader
        kicker="Conference Calendar"
        title={
          <>
            Where your research meets the <Accent>world</Accent>
          </>
        }
        description="Track submission deadlines for conferences and journals across Bangladesh and abroad, so you never miss a call for papers."
        imageSrc="https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1200&q=80&auto=format&fit=crop"
        imageAlt="Audience listening at a research conference"
      />
      <ConferencesExplorer conferences={CONFERENCES} />
    </>
  );
}
