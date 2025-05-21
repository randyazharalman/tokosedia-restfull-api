import { NextFunction, Request, Response } from "express";
import { CreateCartRequest } from "../model/cart-model";
import { CartService } from "../service/cart-service";

export class CartController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateCartRequest = req.body as CreateCartRequest;
      const response = await CartService.create(request);

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId)
      const response = await CartService.get(userId);
    
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
    
  }
}
