import { NextFunction, Request, response, Response } from "express";
import {
  CreateActivityLogRequest,
  DeleteActivityLogRequest,
  GetActivityLogRequest,
} from "../model/activity-log-model";
import { ActivityLogService } from "../service/activity-log-service";
import { ResponseError } from "../error/response-error";
import { UserRequest } from "../type/user-request";

export class ActivityLogController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateActivityLogRequest =
        req.body as CreateActivityLogRequest;
      console.log(request);
      const response = await ActivityLogService.create(request);

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) {
        throw new ResponseError(400, "Invalid User ID");
      }
      console.log(userId);
      const response = await ActivityLogService.get(req.user!, userId)

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) {
        throw new ResponseError(400, "Invalid User ID");
      }
      console.log(userId);
      const response = await ActivityLogService.remove(req.user!, userId)
      console.log(response);
      res.status(200).json({
        data: "OK",
      });
    } catch (error) {
      next(error);
    }
  }
}
