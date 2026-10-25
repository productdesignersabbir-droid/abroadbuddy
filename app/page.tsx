import { Hero } from "@/components/home/Hero";
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
      <LaunchVideo />
      <Problem />
      <Features />
      <JourneyTicket />
      <Steps />
      <RankingPlatforms />
      <FAQ />
      <CTA />
    </>
  );
}
