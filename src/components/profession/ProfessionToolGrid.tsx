import ToolCard from "@/components/tool/ToolCard";
import { Tool } from "@/types/tool";

type Props = {
  tools: Tool[];
};

export default function ProfessionToolGrid({
  tools,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
        />
      ))}
    </div>
  );
}