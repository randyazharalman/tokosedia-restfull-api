import { NextFunction, Request, Response } from "express";
import {
  CreateReviewRequest,
  UpdateReviewRequest,
} from "../model/review-model";
import { ReviewService } from "../service/review-service";
import { UserRequest } from "../type/user-request";
import { ResponseError } from "../error/response-error";

export class ReviewController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateReviewRequest = req.body as CreateReviewRequest;
      const response = await ReviewService.create(request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = Number(req.params.productId);
      if (isNaN(productId)) {
        throw new ResponseError(400, "Invalid review product ID");
      }
      const response = await ReviewService.get(productId);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateReviewRequest = req.body as UpdateReviewRequest;
      request.id = Number(req.params.reviewId);
      if (isNaN(request.id)) {
        throw new ResponseError(400, "Invalid review ID");
      }
      const response = await ReviewService.update(req.user!, request);

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const reviewId = Number(req.params.reviewId);
      await ReviewService.remove(reviewId);
      res.status(200).json({
        data: "OK",
      });
    } catch (error) {
      next(error);
    }
  }
}
