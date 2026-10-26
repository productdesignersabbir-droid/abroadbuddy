import { Accent, PageHeader } from "@/components/PageHeader";
import { MentoringExplorer } from "@/components/mentoring/MentoringExplorer";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function MentoringPage({ searchParams }: { searchParams: SearchParams }) {
  // ?type=research opens the research tab, e.g. from Find my research direction.
  const { type } = await searchParams;
  return (
    <>
      <PageHeader
        kicker="Mentoring"
        title={
          <>
            Talk to someone who has <Accent>done it</Accent>
          </>
        }
        description="Book a session with students, alumni and researchers abroad. Get help with your applications, or with shaping your research."
        imageSrc="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80&auto=format&fit=crop"
        imageAlt="Two students talking on a video call"
      />
      <MentoringExplorer initialType={type === "research" ? "research" : "study"} />
    </>
  );
}
