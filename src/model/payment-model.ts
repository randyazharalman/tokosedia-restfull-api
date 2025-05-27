export interface Payment {
  id: number;
  transactionId: number;
  method: string;
  paidAt: Date | null;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePaymentRequest {
  transactionId: number;
  method: string;
  amount: number;
  paidAt?: Date;
}

export interface UpdatePaymentRequest {
  id: number;
  transactionId?: number;
  method?: string;
  amount?: number;
  paidAt?: Date;
}

export interface GetPaymentRequest {
  id: number;
}

export interface DeletePaymentRequest {
  id: number;
}

export interface PaymentResponse {
  id: number;
  transactionId: number;
  method: string;
  paidAt: Date | null;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export function toPaymentResponse(payment: Payment): PaymentResponse {
  return {
    id: payment.id,
    transactionId: payment.transactionId,
    method: payment.method,
    paidAt: payment.paidAt,
    amount: payment.amount,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
  };
}
