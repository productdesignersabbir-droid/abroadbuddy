import { PageHeader } from "@/components/PageHeader";
import { HowItWorks } from "@/components/mentors/HowItWorks";
import { MentorsExplorer } from "@/components/mentors/MentorsExplorer";
import { MENTORS } from "@/data/mentors";

export default function MentorsPage() {
  return (
    <>
      <PageHeader
        kicker="Find my mentor"
        title="Learn from students who've already made the journey"
        description="Book 1:1 or group sessions with Bangladeshi students and alumni abroad — for honest advice on applications, visas and life on campus."
        imageSrc="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80&auto=format&fit=crop"
        imageAlt="Two students having a friendly video call on a laptop"
      />
      <HowItWorks />
      <MentorsExplorer mentors={MENTORS} />
    </>
  );
}
