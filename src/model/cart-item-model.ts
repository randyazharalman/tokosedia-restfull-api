import { CartItem } from "@prisma/client";

export type CartItemResponse = {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCartItemRequest = {
  cartId: number;
  productId: number;
  quantity: number;
}

export type UpdateCartItemRequest = CreateCartItemRequest & {id: number};

export type DeleteCartItemRequest = {
  cartId: number;
  productId: number;
};

export function toCartItemResponse(item: CartItem): CartItemResponse {
  return {
    id: item.id,
    cartId: item.cartId,
    productId: item.productId,
    quantity: item.quantity,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  };
}