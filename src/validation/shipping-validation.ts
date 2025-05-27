import { z, ZodType } from "zod";
import { 
  CreateShippingRequest, 
  UpdateShippingRequest, 
  ShippingSearchRequest,
  BulkShippingRequest,
  ShippingStatus,
  CourierProvider
} from "../model/shipping-model";

export class ShippingValidation {
  
  static readonly CREATE: ZodType<CreateShippingRequest> = z.object({
    transactionId: z.number().positive("Transaction ID must be a positive number"),
    trackingCode: z.string().min(1, "Tracking code is required").max(100, "Tracking code too long"),
    address: z.string().min(1, "Address is required").max(500, "Address too long"),
    courier: z.nativeEnum(CourierProvider, {
      errorMap: () => ({ message: "Invalid courier provider" })
    }),
    status: z.nativeEnum(ShippingStatus).optional(),
    estimatedDelivery: z.string().datetime().optional(),
    shippedAt: z.string().datetime().optional(),
    weight: z.number().positive("Weight must be positive").optional(),
    dimensions: z.object({
      length: z.number().positive("Length must be positive"),
      width: z.number().positive("Width must be positive"),
      height: z.number().positive("Height must be positive")
    }).optional(),
    shippingCost: z.number().min(0, "Shipping cost cannot be negative").optional(),
    notes: z.string().max(1000, "Notes too long").optional()
  });

  static readonly UPDATE: ZodType<UpdateShippingRequest> = z.object({
    trackingCode: z.string().min(1, "Tracking code is required").max(100, "Tracking code too long").optional(),
    address: z.string().min(1, "Address is required").max(500, "Address too long").optional(),
    courier: z.nativeEnum(CourierProvider, {
      errorMap: () => ({ message: "Invalid courier provider" })
    }).optional(),
    status: z.nativeEnum(ShippingStatus).optional(),
    estimatedDelivery: z.string().datetime().optional(),
    actualDelivery: z.string().datetime().optional(),
    shippedAt: z.string().datetime().optional(),
    weight: z.number().positive("Weight must be positive").optional(),
    dimensions: z.object({
      length: z.number().positive("Length must be positive"),
      width: z.number().positive("Width must be positive"),
      height: z.number().positive("Height must be positive")
    }).optional(),
    shippingCost: z.number().min(0, "Shipping cost cannot be negative").optional(),
    notes: z.string().max(1000, "Notes too long").optional()
  });

  static readonly SEARCH: ZodType<ShippingSearchRequest> = z.object({
    transactionId: z.number().positive().optional(),
    trackingCode: z.string().min(1).max(100).optional(),
    courier: z.nativeEnum(CourierProvider).optional(),
    status: z.nativeEnum(ShippingStatus).optional(),
    dateFrom: z.string().datetime().optional(),
    dateTo: z.string().datetime().optional(),
    page: z.number().positive().optional(),
    size: z.number().positive().max(100, "Page size cannot exceed 100").optional()
  });

  static readonly BULK_CREATE: ZodType<BulkShippingRequest> = z.object({
    shipments: z.array(ShippingValidation.CREATE).min(1, "At least one shipment is required").max(50, "Cannot process more than 50 shipments at once")
  });

  static readonly TRACKING_CODE: ZodType<string> = z.string().min(1, "Tracking code is required").max(100, "Tracking code too long");

  static readonly ID: ZodType<number> = z.number().positive("ID must be a positive number");
}
