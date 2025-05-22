import { TransactionStatus } from "@prisma/client";
import { TransactionItemResponse } from "./transaction-item-model";

export type TransactionResponse = {
  id: number;
  userId: number;
  status: string;
  total: number;
  items: TransactionItemResponse[];
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTransactionItem = {
  productId: number;
  quantity: number;
  priceAtPurchase: number;
};

export type CreateTransactionRequest = {
  userId: number;
  status: TransactionStatus;
  total: number;
  items: CreateTransactionItem[];
};

export type UpdateTransactionRequest = Partial<CreateTransactionRequest> & { id: number };

export type DeleteTransactionRequest = {
  id: number;
  userId: number;
};
