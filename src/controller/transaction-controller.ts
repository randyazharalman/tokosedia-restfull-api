import { NextFunction, Request, Response } from "express";
import { CreateTransactionRequest } from "../model/transaction-model";
import { TransactionService } from "../service/transaction-service";
import { ResponseError } from "../error/response-error";

export class TransactionController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateTransactionRequest =
        req.body as CreateTransactionRequest;
      const response = await TransactionService.create(request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId)
      if(typeof userId !== 'number') throw new ResponseError(400, "Invalid User ID")
      const response = await TransactionService.getByUser(userId);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const transactionId = Number(req.params.transactionId)
      if(typeof transactionId !== 'number') throw new ResponseError(400, "Invalid User ID")
      const request = {
      ...req.body,
      id: transactionId,
    };
      const response = await TransactionService.update(request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const transactionId = Number(req.params.transactionId)
      if(typeof transactionId !== 'number') throw new ResponseError(400, "Invalid User ID")
       const request = {
      id: transactionId,
      userId: Number(req.body.userId),
    };
      const response = await TransactionService.remove(request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
