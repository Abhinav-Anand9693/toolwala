import { tools } from "@/config/tools";

export function searchTools(query: string) {
  const keyword = query.toLowerCase();

  return tools.filter((tool) => {
    return (
      tool.title.toLowerCase().includes(keyword) ||
      tool.description.toLowerCase().includes(keyword) ||
      tool.category.toLowerCase().includes(keyword) ||
      tool.profession.toLowerCase().includes(keyword)
    );
  });
}