// Shipping Status Enum
export enum ShippingStatus {
  PENDING = "pending",
  PROCESSING = "processing", 
  SHIPPED = "shipped",
  IN_TRANSIT = "in_transit",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
  FAILED_DELIVERY = "failed_delivery",
  RETURNED = "returned"
}

// Courier/Shipping Provider Enum
export enum CourierProvider {
  JNE = "JNE",
  TIKI = "TIKI", 
  POS_INDONESIA = "POS_INDONESIA",
  J_T_EXPRESS = "J_T_EXPRESS",
  SICEPAT = "SICEPAT",
  ANTERAJA = "ANTERAJA",
  NINJA_EXPRESS = "NINJA_EXPRESS",
  SHOPEE_EXPRESS = "SHOPEE_EXPRESS",
  GRAB_EXPRESS = "GRAB_EXPRESS",
  GOJEK = "GOJEK"
}

// Shipping Response Type
export type ShippingResponse = {
  id: number;
  transactionId: number;
  trackingCode: string;
  address: string;
  courier: CourierProvider;
  status?: ShippingStatus;
  estimatedDelivery?: string;
  actualDelivery?: string;
  shippedAt?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  shippingCost?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  transaction?: {
    id: number;
    status: string;
    total: number;
  };
}

// Create Shipping Request Type
export type CreateShippingRequest = {
  transactionId: number;
  trackingCode: string;
  address: string;
  courier: CourierProvider;
  status?: ShippingStatus;
  estimatedDelivery?: string;
  shippedAt?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  shippingCost?: number;
  notes?: string;
}

// Update Shipping Request Type
export type UpdateShippingRequest = {
  trackingCode?: string;
  address?: string;
  courier?: CourierProvider;
  status?: ShippingStatus;
  estimatedDelivery?: string;
  actualDelivery?: string;
  shippedAt?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  shippingCost?: number;
  notes?: string;
}

// Shipping Tracking Response Type
export type ShippingTrackingResponse = {
  trackingCode: string;
  status: ShippingStatus;
  courier: CourierProvider;
  currentLocation?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  trackingHistory: TrackingEvent[];
}

// Tracking Event Type
export type TrackingEvent = {
  timestamp: string;
  status: ShippingStatus;
  location: string;
  description: string;
}

// Shipping Search/Filter Parameters
export type ShippingSearchRequest = {
  transactionId?: number;
  trackingCode?: string;
  courier?: CourierProvider;
  status?: ShippingStatus;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  size?: number;
}

// Shipping Statistics Response
export type ShippingStatsResponse = {
  totalShipments: number;
  pendingShipments: number;
  inTransitShipments: number;
  deliveredShipments: number;
  failedDeliveries: number;
  averageDeliveryTime: number; // in days
  courierStats: {
    courier: CourierProvider;
    count: number;
    successRate: number;
  }[];
}

// Bulk Shipping Operations
export type BulkShippingRequest = {
  shipments: CreateShippingRequest[];
}

export type BulkShippingResponse = {
  successful: ShippingResponse[];
  failed: {
    request: CreateShippingRequest;
    error: string;
  }[];
}
