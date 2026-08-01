import Link from "next/link";
import { Tool } from "@/types/tool";

type ToolCardProps = {
  tool: Tool;
};

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg">
      {tool.isAI && (
        <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
          AI
        </span>
      )}

      <h3 className="mt-4 text-xl font-bold">
        {tool.title}
      </h3>

      <p className="mt-2 text-gray-600">
        {tool.description}
      </p>

      <div className="mt-4 flex gap-2">
        <span className="rounded bg-gray-100 px-2 py-1 text-sm">
          {tool.category}
        </span>

        <span className="rounded bg-blue-100 px-2 py-1 text-sm">
          {tool.profession}
        </span>
      </div>

      <Link
        href={`/tool/${tool.id}`}
        className="mt-6 inline-block rounded-lg bg-black px-5 py-2 text-white transition hover:bg-gray-800"
      >
        Open Tool →
      </Link>
    </div>
  );
}