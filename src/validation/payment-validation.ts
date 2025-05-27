import { z, ZodType } from "zod";

export class PaymentValidation {
  static readonly CREATE: ZodType = z.object({
    transactionId: z.number().positive(),
    method: z.string().min(1).max(50),
    amount: z.number().positive(),
    paidAt: z.date().optional()
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    transactionId: z.number().positive().optional(),
    method: z.string().min(1).max(50).optional(),
    amount: z.number().positive().optional(),
    paidAt: z.date().optional()
  });

  static readonly GET: ZodType = z.object({
    id: z.number().positive()
  });
}
