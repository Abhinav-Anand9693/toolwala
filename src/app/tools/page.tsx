import type { Metadata } from "next";
import ToolsDirectory from "@/tools/ToolsDirectory";

export const metadata: Metadata = {
  title: "All Tools",
  description:
    "Explore Toolwala's collection of AI, developer, business, career, education and productivity tools.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsPage() {
  return <ToolsDirectory />;
}