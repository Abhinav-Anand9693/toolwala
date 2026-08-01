import { Tool } from "@/types/tool";

type Props = {
  tool: Tool;
};

export default function ToolHeader({ tool }: Props) {
  return (
    <div className="mb-10">
      <h1 className="text-5xl font-bold">
        {tool.title}
      </h1>

      <p className="mt-4 text-lg text-gray-600">
        {tool.description}
      </p>

      <div className="mt-6 flex gap-3">
        <span className="rounded-full bg-gray-100 px-4 py-2 text-sm">
          {tool.category}
        </span>

        {tool.isAI && (
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm">
            AI Powered
          </span>
        )}
      </div>
    </div>
  );
}