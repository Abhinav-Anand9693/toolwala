import Hero from "@/components/home/Hero";
import SearchSection from "@/components/home/SearchSection";
import ProfessionGrid from "@/components/home/ProfessionGrid";
import FeaturedTools from "@/components/home/FeaturedTools";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchSection />
      <ProfessionGrid />
      <FeaturedTools />
      </>
     
  );
}