import { z, ZodType } from "zod";

export class ReviewValidation {

  static readonly CREATE: ZodType = z.object({
    reviewerName: z.string().min(1),
    reviewerEmail: z.string().email().min(1),
    comment: z.string().min(1),
    rating: z.number(),
    date: z.string().datetime(),
    productId: z.number().positive(),
    userId: z.number().positive(),
  });
  
  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    reviewerName: z.string().min(1).optional(),
    reviewerEmail: z.string().email().min(1).optional(),
    comment: z.string().min(1).optional(),
    rating: z.number().optional(),
    date: z.string().datetime(),
    productId: z.number().positive(),
    userId: z.number().positive(),
  });
  
  static readonly DELETE: ZodType = z.object({
    id: z.number().positive(),
    productId: z.number().positive(),
  });
}
