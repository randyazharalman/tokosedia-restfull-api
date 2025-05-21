import { Cart } from "@prisma/client";
import { CartItemResponse } from "./cart-item-model";

export type CartResponse = {
  id: number;
  userId: number;
  items: CartItemResponse[];
}

export type CreateCartRequest = {
  userId: number;
}

export type GetCartRequest = CreateCartRequest;

export type DeleteCartRequest = CreateCartRequest;

export function toCartResponse(cart: Cart, items: CartItemResponse[]): CartResponse {
  return {
    id: cart.id,
    userId: cart.userId,
    items
  };
}
