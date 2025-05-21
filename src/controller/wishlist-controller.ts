import { NextFunction, Request, Response } from "express";
import { WishlistService } from "../service/wishlist-service";
import { CreateWishlistRequest, DeleteWishlistRequest, GetWishlistRequest } from "../model/wishlist-model";

export class WishlistController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.userId);
      const request: CreateWishlistRequest = {
        ...(req.body as CreateWishlistRequest),
        userId,
      };
      console.log(request);
      const response = await WishlistService.create(request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.userId);
      const request: GetWishlistRequest = req.body as GetWishlistRequest;
      request.userId = Number(userId)
      console.log(request);
      const response = await WishlistService.get(request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.userId);
      const request: DeleteWishlistRequest = req.body as DeleteWishlistRequest;
      request.userId = Number(userId)
      console.log(request);
      const response = await WishlistService.remove(request);
      res.status(200).json({
        data: "OK",
      });
    } catch (error) {
      next(error);
    }
  }
}
