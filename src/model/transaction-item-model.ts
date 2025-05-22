import { ProductResponse } from "./product-model";

export type TransactionItemResponse = {
  id: number;
  transactionId: number;
  productId: number;
  quantity: number;
  priceAtPurchase: number;
  createdAt: Date;
  updatedAt: Date;
  product?: ProductResponse;
};

export type CreateTransactionItemRequest = {
  productId: number;
  quantity: number;
  priceAtPurchase: number;
};