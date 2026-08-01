import { tools } from "@/config/tools";

export function getToolsByProfession(
  profession: string
) {
  return tools.filter(
    (tool) =>
      tool.profession === profession
  );
}