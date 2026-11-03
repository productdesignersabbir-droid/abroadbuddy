import { Hero } from "@/components/home/Hero";
import { WhereNow } from "@/components/home/WhereNow";
import { Stipends } from "@/components/home/Stipends";
import { BecomeMentor } from "@/components/home/BecomeMentor";
import { TodayTomorrow } from "@/components/home/TodayTomorrow";
import { Journey } from "@/components/home/Journey";
import { JourneyTicket } from "@/components/home/JourneyTicket";
import { Steps } from "@/components/home/Steps";
import { RankingPlatforms } from "@/components/home/RankingPlatforms";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stipends />
      <Journey />
      <WhereNow />
      <TodayTomorrow />
      <JourneyTicket />
      <Steps />
      <RankingPlatforms />
      <BecomeMentor />
      <FAQ />
      <CTA />
    </>
  );
}
