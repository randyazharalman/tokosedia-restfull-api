import { Request, Response, NextFunction } from "express";
import { PaymentService } from "../service/payment-service";
import { CreatePaymentRequest } from "../model/payment-model";

export class PaymentController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreatePaymentRequest = req.body as CreatePaymentRequest;
      const response = await PaymentService.create(request);
      res.status(200).json({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.paymentId);
      console.log(req.params);
      const request = { id };
      console.log(request); //NAN
      const payment = await PaymentService.get(request);
      res.status(200).json({
        data: payment
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.paymentId);
      console.log(id);
      const request = {
        id,
        ...req.body
      };
      const updatedPayment = await PaymentService.update(request);
      res.status(200).json({
        data: updatedPayment
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.paymentId);
      const request = { id };
      const deletedPayment = await PaymentService.delete(request);
      res.status(200).json({
        data: "OK"
      });
    } catch (error) {
      next(error);
    }
  }
}
