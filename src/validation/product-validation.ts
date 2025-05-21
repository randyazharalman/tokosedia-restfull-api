import { z, ZodType } from "zod";

export class ProductValidation {
  static readonly CREATE: ZodType = z.object({
    title: z
      .string()
      .min(1)
      .transform((val) => val.trim().toLowerCase()),
    price: z.number(),
    description: z.string().min(1),
    stock: z.number(),
    brand: z
      .string()
      .min(1)
      .transform((val) => val.trim().toLowerCase()),
    tags: z.array(z.string()).optional(),
    color: z.array(z.string()).optional(),
    size: z.array(z.string()).optional(),
    weight: z.number().min(0).optional(),
    thumbnail: z.string().min(1),
    images: z.string().array(),
    sku: z
      .string()
      .min(1)
      .transform((val) => val.trim()),
    discountPercentage: z.number().default(0).optional(),
    availabilityStatus: z.string().min(1),
    shippingInformation: z.string().min(1),
    returnPolicy: z.string().min(1),
    warrantyInformation: z.string().min(1),
    minimumOrderQuantity: z.number(),
    categoryId: z.number(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    title: z.string().min(1).optional(),
    price: z.number().optional(),
    description: z.string().min(1).optional(),
    stock: z.number().optional(),
    brand: z.string().min(1).optional(),
    tags: z.string().array().optional().optional(),
    color: z.string().array().optional().optional(),
    size: z.string().array().optional().optional(),
    weight: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
    thumbnail: z.string().min(1).optional(),
    images: z.string().array().optional(),
    sku: z.string().min(1).optional(),
    discountPercentage: z.number().default(0).optional(),
    availabilityStatus: z.string().optional(),
    shippingInformation: z.string().min(1).optional(),
    returnPolicy: z.string().min(1).optional(),
    warrantyInformation: z.string().min(1).optional(),
    minimumOrderQuantity: z.number().optional(),
    categoryId: z.number().optional(),
  });
}
