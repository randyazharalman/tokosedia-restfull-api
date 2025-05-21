import { Request } from "express";
import { CartItemResponse, CreateCartItemRequest, DeleteCartItemRequest, toCartItemResponse, UpdateCartItemRequest } from "../model/cart-item-model";
import { prisma } from "../application/database";

export class CartItemService {
  static async create(request: CreateCartItemRequest): Promise<CartItemResponse> {
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: request.cartId,
          productId: request.productId
        }
      }
    })
    
    if(existingCartItem) {
      return await prisma.cartItem.update({
        where: {
          id: existingCartItem.id
        },
        data: {
          quantity: existingCartItem.quantity + request.quantity
        }
      })

    }
    const cartItem = await prisma.cartItem.create({
      data: request
    })

    return toCartItemResponse(cartItem)
  }

  static async update(request: UpdateCartItemRequest): Promise<CartItemResponse>{
    const cartItem = await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: request.cartId,
          productId: request.productId
        }
      },
      data: { quantity: request.quantity }
    })

    return toCartItemResponse(cartItem)
  }

  static async remove(request: DeleteCartItemRequest): Promise<CartItemResponse>{
    const cartItem = await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: request.cartId,
          productId: request.productId
        }
      }
    })

    return toCartItemResponse(cartItem)
  }
}