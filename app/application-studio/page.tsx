import { Accent, PageHeader } from "@/components/PageHeader";
import { ApplicationStudioFromUrl } from "@/components/application-studio/ApplicationStudioFromUrl";

export default function ApplicationStudioPage() {
  return (
    <>
      <PageHeader
        kicker="Application Studio"
        title={
          <>
            Make your application <Accent>clear</Accent>
          </>
        }
        description="Pick a document, fill in a few boxes, and get a well-ordered draft to copy and finish: your CV, statement, research proposal or a reference request."
        imageSrc="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80&auto=format&fit=crop"
        imageAlt="Close-up of a pen writing on lined paper"
      />
      <ApplicationStudioFromUrl />
    </>
  );
}
