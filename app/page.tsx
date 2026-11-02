import { Hero } from "@/components/home/Hero";
import { WhereNow } from "@/components/home/WhereNow";
import { Stipends } from "@/components/home/Stipends";
import { BecomeMentor } from "@/components/home/BecomeMentor";
import { LaunchVideo } from "@/components/home/LaunchVideo";
import { Problem } from "@/components/home/Problem";
import { Features } from "@/components/home/Features";
import { JourneyTicket } from "@/components/home/JourneyTicket";
import { Steps } from "@/components/home/Steps";
import { RankingPlatforms } from "@/components/home/RankingPlatforms";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhereNow />
      <LaunchVideo />
      <Problem />
      <Stipends />
      <Features />
      <JourneyTicket />
      <Steps />
      <RankingPlatforms />
      <BecomeMentor />
      <FAQ />
      <CTA />
    </>
  );
}
