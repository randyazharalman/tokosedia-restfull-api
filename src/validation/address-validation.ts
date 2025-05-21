import { z, ZodType } from "zod";


export class AddressValidation {

  static readonly CREATE: ZodType = z.object({
    label: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
    userId: z.number()
  })

    static readonly UPDATE: ZodType = z.object({
      id: z.number().positive(),
    label: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    userId: z.number().optional()
  })

    static readonly DELETE : ZodType = z.object({
      id: z.number().positive(),
      userId: z.number().positive(),
    })
}