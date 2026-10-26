import { Accent, PageHeader } from "@/components/PageHeader";
import { ApplicationStudio } from "@/components/application-studio/ApplicationStudio";
import type { DocId, StudioDegree } from "@/data/application-studio";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const DOCS: DocId[] = ["cv", "statement", "proposal", "reference"];
const DEGREES: StudioDegree[] = ["bachelors", "masters", "phd"];

export default async function ApplicationStudioPage({ searchParams }: { searchParams: SearchParams }) {
  // Other pages can open a specific document, e.g. ?doc=proposal.
  const { doc, degree } = await searchParams;
  const initialDoc = DOCS.find((d) => d === doc);
  const initialDegree = DEGREES.find((d) => d === degree);
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
      <ApplicationStudio
        initialDoc={initialDoc}
        initialDegree={initialDoc === "proposal" && !initialDegree ? "phd" : initialDegree}
      />
    </>
  );
}
