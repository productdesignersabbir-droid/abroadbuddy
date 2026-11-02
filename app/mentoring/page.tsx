import { Accent, PageHeader } from "@/components/PageHeader";
import { BecomeMentorForm } from "@/components/mentoring/BecomeMentorForm";
import { MentoringFromUrl } from "@/components/mentoring/MentoringFromUrl";

export default function MentoringPage() {
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
      <MentoringFromUrl />
      <BecomeMentorForm />
    </>
  );
}
