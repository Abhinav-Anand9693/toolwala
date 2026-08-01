import Hero from "@/components/home/Hero";
import SearchSection from "@/components/home/SearchSection";
import ProfessionGrid from "@/components/home/ProfessionGrid";
import PopularTools from "@/components/home/PopularTools";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchSection />
      <ProfessionGrid />
      <PopularTools />
    </>
  );
}