import { z } from "zod";

export const jsonFormatterSchema = z.object({
  json: z
    .string()
    .min(1, "JSON is required"),
});

export type JsonFormatterForm = z.infer<
  typeof jsonFormatterSchema
>;