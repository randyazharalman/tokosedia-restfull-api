import { Product, Wishlist } from "@prisma/client";
import { ProductResponse, toProductResponse } from "./product-model";

export type WishlistResponse = {
  id: number;
  userId: number;
  items: ProductResponse[]; 
  createdAt: string;
  updatedAt: string;
}

export type CreateWishlistRequest = {
  userId: number;
  items: number[]; 
}

export type GetWishlistRequest = {userId: number}

export type UpdateWishlistRequest = Partial<CreateWishlistRequest> & {id: number}

export type DeleteWishlistRequest = GetWishlistRequest

export function toWishlistResponse(
  wishlist: Wishlist & { items: Product[] }
): WishlistResponse {
  return {
    id: wishlist.id,
    userId: wishlist.userId,
    items: wishlist.items.map(toProductResponse),
    createdAt: wishlist.createdAt.toISOString(),
    updatedAt: wishlist.updatedAt.toISOString(),
  };
}