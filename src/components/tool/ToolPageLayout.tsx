import { ReactNode } from "react";
import { Tool } from "@/types/tool";

import Breadcrumb from "./Breadcrumb";
import ToolActions from "./ToolActions";
import ToolDescription from "./ToolDescription";
import ToolStats from "./ToolStats";

type Props = {
  tool: Tool;
  children: ReactNode;
};

export default function ToolPageLayout({
  tool,
  children,
}: Props) {
  return (
    <>
      <Breadcrumb
        profession={tool.profession}
        title={tool.title}
      />

      <h1 className="text-5xl font-bold">
        {tool.title}
      </h1>

      <ToolStats />

      <ToolDescription
        description={tool.description}
      />

      <ToolActions />

      <div className="mt-16">
        {children}
      </div>
    </>
  );
}