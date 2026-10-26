import { Accent, PageHeader } from "@/components/PageHeader";
import { ReadinessQuiz } from "@/components/readiness/ReadinessQuiz";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const DEGREES = ["bachelors", "masters", "phd"] as const;

export default async function ReadinessPage({ searchParams }: { searchParams: SearchParams }) {
  // University Finder links here with the degree already chosen.
  const { degree } = await searchParams;
  const initialDegree = DEGREES.find((d) => d === degree);
  return (
    <>
      <PageHeader
        kicker="Study Abroad Readiness"
        title={
          <>
            How <Accent>ready</Accent> are you to study abroad?
          </>
        }
        description="Tell us your degree, field, destination and start date, then answer five questions about your grades, English, research, budget and documents. You'll get a readiness score, a timeline and a to-do list made for your plan."
        imageSrc="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=80&auto=format&fit=crop"
        imageAlt="Three students looking at a tablet together"
      />
      <ReadinessQuiz initialDegree={initialDegree} />
    </>
  );
}
