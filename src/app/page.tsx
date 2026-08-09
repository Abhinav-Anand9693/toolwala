import Hero from "@/components/home/Hero";
import SearchSection from "@/components/home/SearchSection";
import ProfessionGrid from "@/components/home/ProfessionGrid";
import FeaturedTools from "@/components/home/FeaturedTools";
import ToolsSection from "@/components/home/ToolsSection";
import HowItWorks from "@/components/home/HowItWorks";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchSection />
      <ProfessionGrid />
      <FeaturedTools />
       <ToolsSection />
      <HowItWorks />
      <FAQ />
      <FinalCTA />
    </>
     
  );
}