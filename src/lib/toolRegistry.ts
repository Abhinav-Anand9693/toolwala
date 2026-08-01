import { tools } from "@/config/tools";

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.id === slug);
}