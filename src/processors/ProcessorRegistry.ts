import { AIProcessor } from "./AIProcessor";
import { JSONProcessor } from "./JSONProcessor";
import { PDFProcessor } from "./PDFProcessor";

export function runProcessor(type: string, data: unknown) {
  switch (type) {
    case "ai":
      return AIProcessor(data);

    case "json":
      if (typeof data !== "string") {
        return {
          success: false,
          result: "JSON Processor requires a string input",
        };
      }
      return JSONProcessor(data);


    case "pdf":
      return PDFProcessor();

    default:
      return {
        success: false,
        result: "Processor Not Found",
      };
  }
}