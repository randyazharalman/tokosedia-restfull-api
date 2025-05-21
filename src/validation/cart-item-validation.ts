import { z, ZodType } from "zod";

export class CartItemValidation {
  static readonly ADD: ZodType = z.object({
    cartId: z.number().positive(),
    productId: z.number().positive(),
    quantity: z.number().int().min(1)
  });

  static readonly UPDATE: ZodType = z.object({
    cartId: z.number().positive(),
    productId: z.number().positive(),
    quantity: z.number().int().min(1)
  });

  static readonly DELETE: ZodType = z.object({
    cartId: z.number().positive(),
    productId: z.number().positive()
  });
}
