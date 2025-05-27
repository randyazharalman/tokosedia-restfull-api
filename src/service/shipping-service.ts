import { prisma } from "../application/database";
import { ResponseError } from "../error/response-error";
import { 
  CreateShippingRequest, 
  UpdateShippingRequest, 
  ShippingResponse, 
  ShippingSearchRequest,
  ShippingTrackingResponse,
  ShippingStatsResponse,
  BulkShippingRequest,
  BulkShippingResponse,
  ShippingStatus,
  CourierProvider,
  TrackingEvent
} from "../model/shipping-model";
import { ShippingValidation } from "../validation/shipping-validation";
import { Validation } from "../validation/validation";
import { Shipping, Transaction } from "@prisma/client";

export class ShippingService {

  static async create(request: CreateShippingRequest): Promise<ShippingResponse> {
    const createRequest = Validation.validate(ShippingValidation.CREATE, request);

    // Check if transaction exists
    const transaction = await prisma.transaction.findFirst({
      where: { id: createRequest.transactionId }
    });

    if (!transaction) {
      throw new ResponseError(404, "Transaction not found");
    }

    // Check if shipping already exists for this transaction
    const existingShipping = await prisma.shipping.findFirst({
      where: { transactionId: createRequest.transactionId }
    });

    if (existingShipping) {
      throw new ResponseError(400, "Shipping already exists for this transaction");
    }

    // Check if tracking code is unique
    const existingTrackingCode = await prisma.shipping.findFirst({
      where: { trackingCode: createRequest.trackingCode }
    });

    if (existingTrackingCode) {
      throw new ResponseError(400, "Tracking code already exists");
    }

    const shipping = await prisma.shipping.create({
      data: {
        transactionId: createRequest.transactionId,
        trackingCode: createRequest.trackingCode,
        address: createRequest.address,
        courier: createRequest.courier,
        shippedAt: createRequest.shippedAt ? new Date(createRequest.shippedAt) : null
      },
      include: {
        transaction: {
          select: {
            id: true,
            status: true,
            total: true
          }
        }
      }
    });

    return this.toShippingResponse(shipping);
  }

  static async update(id: number, request: UpdateShippingRequest): Promise<ShippingResponse> {
    const updateRequest = Validation.validate(ShippingValidation.UPDATE, request);
    const shippingId = Validation.validate(ShippingValidation.ID, id);

    // Check if shipping exists
    const existingShipping = await prisma.shipping.findFirst({
      where: { id: shippingId }
    });

    if (!existingShipping) {
      throw new ResponseError(404, "Shipping not found");
    }

    // Check if tracking code is unique (if being updated)
    if (updateRequest.trackingCode && updateRequest.trackingCode !== existingShipping.trackingCode) {
      const existingTrackingCode = await prisma.shipping.findFirst({
        where: { 
          trackingCode: updateRequest.trackingCode,
          id: { not: shippingId }
        }
      });

      if (existingTrackingCode) {
        throw new ResponseError(400, "Tracking code already exists");
      }
    }

    const shipping = await prisma.shipping.update({
      where: { id: shippingId },
      data: {
        ...(updateRequest.trackingCode && { trackingCode: updateRequest.trackingCode }),
        ...(updateRequest.address && { address: updateRequest.address }),
        ...(updateRequest.courier && { courier: updateRequest.courier }),
        ...(updateRequest.shippedAt && { shippedAt: new Date(updateRequest.shippedAt) })
      },
      include: {
        transaction: {
          select: {
            id: true,
            status: true,
            total: true
          }
        }
      }
    });

    return this.toShippingResponse(shipping);
  }

  static async get(id: number): Promise<ShippingResponse> {
    const shippingId = Validation.validate(ShippingValidation.ID, id);

    const shipping = await prisma.shipping.findFirst({
      where: { id: shippingId },
      include: {
        transaction: {
          select: {
            id: true,
            status: true,
            total: true
          }
        }
      }
    });

    if (!shipping) {
      throw new ResponseError(404, "Shipping not found");
    }

    return this.toShippingResponse(shipping);
  }

  static async getByTrackingCode(trackingCode: string): Promise<ShippingResponse> {
    const validTrackingCode = Validation.validate(ShippingValidation.TRACKING_CODE, trackingCode);

    const shipping = await prisma.shipping.findFirst({
      where: { trackingCode: validTrackingCode },
      include: {
        transaction: {
          select: {
            id: true,
            status: true,
            total: true
          }
        }
      }
    });

    if (!shipping) {
      throw new ResponseError(404, "Shipping not found");
    }

    return this.toShippingResponse(shipping);
  }

  static async search(request: ShippingSearchRequest): Promise<{
    data: ShippingResponse[];
    paging: {
      page: number;
      size: number;
      total: number;
      totalPages: number;
    }
  }> {
    const searchRequest = Validation.validate(ShippingValidation.SEARCH, request);
    const page = searchRequest.page || 1;
    const size = searchRequest.size || 10;
    const skip = (page - 1) * size;

    const filters: any = {};

    if (searchRequest.transactionId) {
      filters.transactionId = searchRequest.transactionId;
    }

    if (searchRequest.trackingCode) {
      filters.trackingCode = {
        contains: searchRequest.trackingCode,
        mode: 'insensitive'
      };
    }


    if (searchRequest.courier) {
      filters.courier = searchRequest.courier;
    }

    if (searchRequest.dateFrom || searchRequest.dateTo) {
      filters.createdAt = {};
      if (searchRequest.dateFrom) {
        filters.createdAt.gte = new Date(searchRequest.dateFrom);
      }
      if (searchRequest.dateTo) {
        filters.createdAt.lte = new Date(searchRequest.dateTo);
      }
    }

    const [shipments, total] = await Promise.all([
      prisma.shipping.findMany({
        where: filters,
        include: {
          transaction: {
            select: {
              id: true,
              status: true,
              total: true
            }
          }
        },
        skip,
        take: size,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.shipping.count({ where: filters })
    ]);

    return {
      data: shipments.map(shipping => this.toShippingResponse(shipping)),
      paging: {
        page,
        size,
        total,
        totalPages: Math.ceil(total / size)
      }
    };
  }

  static async delete(id: number): Promise<void> {
    const shippingId = Validation.validate(ShippingValidation.ID, id);

    const shipping = await prisma.shipping.findFirst({
      where: { id: shippingId }
    });

    if (!shipping) {
      throw new ResponseError(404, "Shipping not found");
    }

    await prisma.shipping.delete({
      where: { id: shippingId }
    });
  }

  static async getStats(): Promise<ShippingStatsResponse> {
    const [
      totalShipments,
      pendingShipments,
      inTransitShipments,
      deliveredShipments,
      failedDeliveries,
      courierStats
    ] = await Promise.all([
      prisma.shipping.count(),
      prisma.shipping.count({
        where: {
          transaction: {
            status: 'pending'
          }
        }
      }),
      prisma.shipping.count({
        where: {
          transaction: {
            status: 'shipped'
          }
        }
      }),
      prisma.shipping.count({
        where: {
          transaction: {
            status: 'delivered'
          }
        }
      }),
      prisma.shipping.count({
        where: {
          transaction: {
            status: 'cancelled'
          }
        }
      }),
      prisma.shipping.groupBy({
        by: ['courier'],
        _count: {
          id: true
        }
      })
    ]);

    // Calculate average delivery time (mock calculation)
    const averageDeliveryTime = 3; // This would need actual delivery time calculation

    return {
      totalShipments,
      pendingShipments,
      inTransitShipments,
      deliveredShipments,
      failedDeliveries,
      averageDeliveryTime,
      courierStats: courierStats.map(stat => ({
        courier: stat.courier as CourierProvider,
        count: stat._count.id,
        successRate: 95 // This would need actual success rate calculation
      }))
    };
  }

  static async bulkCreate(request: BulkShippingRequest): Promise<BulkShippingResponse> {
    const bulkRequest = Validation.validate(ShippingValidation.BULK_CREATE, request);
    
    const successful: ShippingResponse[] = [];
    const failed: { request: CreateShippingRequest; error: string }[] = [];

    for (const shipmentRequest of bulkRequest.shipments) {
      try {
        const shipping = await this.create(shipmentRequest);
        successful.push(shipping);
      } catch (error) {
        failed.push({
          request: shipmentRequest,
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }

    return { successful, failed };
  }

  static async trackShipment(trackingCode: string): Promise<ShippingTrackingResponse> {
    const validTrackingCode = Validation.validate(ShippingValidation.TRACKING_CODE, trackingCode);

    const shipping = await this.getByTrackingCode(validTrackingCode);

    // Mock tracking history - in real implementation, this would integrate with courier APIs
    const trackingHistory: TrackingEvent[] = [
      {
        timestamp: shipping.createdAt,
        status: ShippingStatus.PENDING,
        location: "Warehouse",
        description: "Shipment created"
      }
    ];

    if (shipping.shippedAt) {
      trackingHistory.push({
        timestamp: shipping.shippedAt,
        status: ShippingStatus.SHIPPED,
        location: "Origin City",
        description: "Package shipped"
      });
    }

    return {
      trackingCode: shipping.trackingCode,
      status: ShippingStatus.PENDING, // This would be determined by actual tracking
      courier: shipping.courier,
      estimatedDelivery: shipping.estimatedDelivery,
      actualDelivery: shipping.actualDelivery,
      trackingHistory
    };
  }

  private static toShippingResponse(shipping: Shipping & { 
    transaction?: { id: number; status: string; total: number } 
  }): ShippingResponse {
    return {
      id: shipping.id,
      transactionId: shipping.transactionId,
      trackingCode: shipping.trackingCode,
      address: shipping.address,
      courier: shipping.courier as CourierProvider,
      shippedAt: shipping.shippedAt?.toISOString(),
      createdAt: shipping.createdAt.toISOString(),
      updatedAt: shipping.updatedAt.toISOString(),
      ...(shipping.transaction && { transaction: shipping.transaction })
    };
  }
}
