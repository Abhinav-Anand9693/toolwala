import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import SearchSection from "@/components/home/SearchSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import ProfessionGrid from "@/components/home/ProfessionGrid";
import ToolsSection from "@/components/home/ToolsSection";
import HowItWorks from "@/components/home/HowItWorks";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "AI Tools & Productivity Workspace",
  description:
    "Discover AI, developer, career, business and productivity tools in one professional workspace.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchSection />
      <CategoriesSection />
      <ProfessionGrid />
      <ToolsSection />
      <HowItWorks />
      <FAQ />
      <FinalCTA />
    </>
  );
}