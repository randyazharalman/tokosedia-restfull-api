import { prisma } from "../application/database";
import { CartResponse, CreateCartRequest, toCartResponse } from "../model/cart-model";
import { Validation } from "../validation/validation";
import { CartValidation } from "../validation/cart-validation";
import { ResponseError } from "../error/response-error";
import { toCartItemResponse } from "../model/cart-item-model";

export class CartService{
  static async create(request: CreateCartRequest): Promise<CartResponse>{
    const createCartRequest = Validation.validate(CartValidation.CREATE, request)
    const cartExists = await prisma.cart.findUnique({
      where: {
        userId: createCartRequest.userId
      }
    })

    if(cartExists) throw new ResponseError(400, "Cart Already Exists");

    const cart = await prisma.cart.create({
      data: {
        userId: createCartRequest.userId
      }
    })


    return toCartResponse(cart, [])
  }

  static async get(userId: number ): Promise<CartResponse>{
    
    const cart = await prisma.cart.findUnique({
      where: {
        userId: userId
      },
      include: {
        items: true
      }
    })

    if(!cart) throw new ResponseError(404, "Cart not found")

    const items =  cart.items.map(toCartItemResponse)


    return toCartResponse(cart, items)
  }
}