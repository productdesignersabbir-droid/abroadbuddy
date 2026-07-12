import { PageHeader } from "@/components/PageHeader";
import { ToolsExplorer } from "@/components/tools/ToolsExplorer";
import { SpecialistsSection } from "@/components/tools/SpecialistsSection";
import { PricingStrip } from "@/components/tools/PricingStrip";

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        kicker="AI Writing Tools"
        title="Draft your CV, SOP and LOR in minutes — free to start"
        description="Generate a strong first draft with AI at no cost, upgrade for sharper premium drafts, or hire a vetted specialist to write your documents with you."
        imageSrc="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80&auto=format&fit=crop"
        imageAlt="Close-up of a fountain pen writing on lined paper"
      />
      <ToolsExplorer />
      <SpecialistsSection />
      <PricingStrip />
    </>
  );
}
