import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Features } from "@/components/home/Features";
import { RankingPlatforms } from "@/components/home/RankingPlatforms";
import { LabSpotlight } from "@/components/home/LabSpotlight";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Features />
      <RankingPlatforms />
      <LabSpotlight />
      <CTA />
    </>
  );
}
