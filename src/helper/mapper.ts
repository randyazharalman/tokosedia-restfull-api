import { TransactionItemResponse } from "../model/transaction-item-model";
import { TransactionResponse } from "../model/transaction-model";

export function toTransactionItemResponse(item: any): TransactionItemResponse {
  return {
    id: item.id,
    transactionId: item.transactionId,
    productId: item.productId,
    quantity: item.quantity,
    priceAtPurchase: item.priceAtPurchase,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    product: item.product,
  };
}

export function toTransactionResponse(tx: any): TransactionResponse {
  return {
    id: tx.id,
    userId: tx.userId,
    status: tx.status,
    total: tx.total,
    items: tx.items.map(toTransactionItemResponse),
    createdAt: tx.createdAt,
    updatedAt: tx.updatedAt,
  };
}