import { runProcessor } from "@/processors/ProcessorRegistry";
import { Tool } from "@/types/tool";

export function executeTool(tool: Tool, input: unknown) {
  return runProcessor(tool.processor, input);
}