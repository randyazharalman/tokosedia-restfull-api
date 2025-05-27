import { Request, Response, NextFunction } from "express";
import { ShippingService } from "../service/shipping-service";
import { CreateShippingRequest, UpdateShippingRequest } from "../model/shipping-model";

export class ShippingController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateShippingRequest = req.body as CreateShippingRequest;
      const response = await ShippingService.create(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.shippingId);
      const response = await ShippingService.get(id);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateShippingRequest = req.body as UpdateShippingRequest;
      const id = Number(req.params.shippingId);
      const response = await ShippingService.update(id, request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.shippingId);
      await ShippingService.delete(id);
      res.status(200).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ShippingService.search(req.body);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
}
