import { NextFunction, Request, Response } from "express";
import { CreateCartItemRequest, DeleteCartItemRequest, UpdateCartItemRequest } from "../model/cart-item-model";
import { CartItemService } from "../service/cart-item-service";

export class CartItemController{

  static async create(req: Request, res: Response, next: NextFunction){
    try {
      const request: CreateCartItemRequest = req.body as CreateCartItemRequest;
      const response = await CartItemService.create(request);

      res.status(200).json({
        data: response
      })
    } catch (error) {
      next(error)
    }
  }
  static async update(req: Request, res: Response, next: NextFunction){
    try {
      const request: UpdateCartItemRequest = req.body as UpdateCartItemRequest;
      const response = await CartItemService.update(request);

      res.status(200).json({
        data: response
      })
    } catch (error) {
      next(error)
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction){
    try {
      const request: DeleteCartItemRequest = req.body as DeleteCartItemRequest
      const response = await CartItemService.remove(request);

      res.status(200).json({
        data: "OK"
      })
    } catch (error) {
      next(error)
    }
  }

}