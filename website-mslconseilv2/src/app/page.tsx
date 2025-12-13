import HeroSlider from "@/components/HeroSlider";
import VideoSection from "@/components/VideoSection";
import BenefitsGrid from "@/components/BenefitsGrid";
import AboutServices from "@/components/AboutServices";
import PiloterMethod from "@/components/PiloterMethod";
import ResultsSection from "@/components/ResultsSection";
import SixReasons from "@/components/SixReasons";
import ComplementaryServices from "@/components/ComplementaryServices";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Immersive Slider Section */}
      <HeroSlider />

      {/* Video Section */}
      <VideoSection />

      {/* Benefits Grid Section */}
      <BenefitsGrid />

      {/* About & Services Section */}
      <AboutServices />

      {/* PILOTER Method Interactive Section */}
      <PiloterMethod />

      {/* Results/Stats Section */}
      <ResultsSection />

      {/* 6 Reasons Section */}
      <SixReasons />

      {/* Complementary Services & Final CTA */}
      <ComplementaryServices />
    </main>
  );
}
