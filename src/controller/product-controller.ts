import { NextFunction, Request, Response } from "express";
import { ProductService } from "../service/product-service";
import { CreateProductRequest, UpdateProductRequest } from "../model/product-model";
import { logger } from "../application/logging";
import { UserRequest } from "../type/user-request";
import { ResponseError } from "../error/response-error";

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateProductRequest = req.body as CreateProductRequest;
      const response = await ProductService.create(request);

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
      const response = await ProductService.get(productId);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // const productId = Number(req.params.productId)
      const request: UpdateProductRequest = req.body as UpdateProductRequest
      request.id = Number(req.params.productId)
       if (isNaN(request.id)) {
              throw new ResponseError(400, "Invalid product ID");
            }
      const response = await ProductService.update(req.user!,request);

      res.status(200).json({
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = Number(req.params.productId);
      const response = await ProductService.remove(productId);
      logger.debug("response : " + JSON.stringify(response));
      res.status(200).json({
        data: "OK",
      });
    } catch (error) {
      next(error);
    }
  }
}
