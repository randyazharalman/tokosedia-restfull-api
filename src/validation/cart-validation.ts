import { z, ZodType } from "zod";

export class CartValidation {
  static readonly CREATE: ZodType = z.object({
    userId: z.number().positive()
  });

  static readonly GET: ZodType = z.object({
    userId: z.number().positive()
  });

  static readonly DELETE: ZodType = z.object({
    userId: z.number().positive()
  });
}
