import JsonFormatter from "@/tools/json-formatter/JsonFormatter";

type Props = {
  slug: string;
};

export default function ToolWorkspace({
  slug,
}: Props) {
  if (slug === "json-formatter") {
    return <JsonFormatter />;
  }

  return (
    <div className="rounded-xl border p-8 text-center">
      Tool Coming Soon...
    </div>
  );
}