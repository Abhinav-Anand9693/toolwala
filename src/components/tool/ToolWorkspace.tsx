import ToolForm from "./ToolForm";
import ToolOutput from "./output/ToolOutput";
import { getFormByTool } from "@/lib/formRegistry";

type Props = {
  slug: string;
};

export default function ToolWorkspace({ slug }: Props) {
  const formConfig = getFormByTool(slug);

  if (!formConfig) {
    return (
      <div className="rounded-xl border p-8">
        No form available.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-8 shadow-sm">
      <ToolForm config={formConfig} />

      <ToolOutput
        result={`{
  "name": "Toolwala",
  "status": "Working"
}`}
      />
    </div>
  );
}