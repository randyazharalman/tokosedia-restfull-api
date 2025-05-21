import { z, ZodType } from "zod";

export class WishlistValidation {
 static readonly CREATE: ZodType = z.object({
    userId: z.number().positive(),
    items: z.array(z.number().positive())
  });

  static readonly GET: ZodType = z.object({
    userId: z.number().positive()
  });

  static readonly DELETE: ZodType = z.object({
    userId: z.number().positive()
  });
}