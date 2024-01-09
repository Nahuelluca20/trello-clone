import { z } from "zod";

export const boardSchema = z.object({
  name: z.string().min(2, { message: "Board name is required" }),
  label: z.string().min(2, { message: "Select one label" }),
});
