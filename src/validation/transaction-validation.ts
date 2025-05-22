import { z, ZodType } from "zod";

export const CreateTransactionItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
  priceAtPurchase: z.number().nonnegative()
});

export class TransactionValidation {
  static readonly CREATE = z.object({
    userId: z.number().positive(),
    status: z.string().min(1),
    total: z.number().nonnegative(),
    items: z
      .array(
        z.object({
          productId: z.number().positive(),
          quantity: z.number().positive(),
          priceAtPurchase: z.number().nonnegative(),
        })
      )
      .min(1),
  });

  static readonly UPDATE = z
    .object({
      id: z.number().positive(),
      userId: z.number().positive().optional(),
      status: z.string().optional(),
      total: z.number().optional(),
      items: z
        .array(
          z.object({
            productId: z.number().positive(),
            quantity: z.number().positive(),
            priceAtPurchase: z.number().nonnegative(),
          })
        )
        .optional(),
    })
    .strict();

  static readonly DELETE = z.object({
    id: z.number().positive(),
    userId: z.number().positive(),
  });
}