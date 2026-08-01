import ToolCard from "@/components/tool/ToolCard";
import { Tool } from "@/types/tool";

type SearchResultsProps = {
  tools: Tool[];
};

export default function SearchResults({
  tools,
}: SearchResultsProps) {
  if (tools.length === 0) return null;

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
        />
      ))}
    </div>
  );
}