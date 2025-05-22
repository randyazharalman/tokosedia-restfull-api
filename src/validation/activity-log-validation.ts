import { z, ZodType } from "zod";

export class ActivityLogValidation {
  static readonly CREATE: ZodType = z.object({
    userId: z.number().positive(),
    action: z.string().min(1)
  });

  static readonly GET: ZodType = z.object({
    id: z.number().positive(),
    userId: z.number().positive(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.number().positive(),
    userId: z.number().positive(),
  });
}