import { ActivityLog, User } from "@prisma/client";
import { prisma } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  ActivityLogResponse,
  CreateActivityLogRequest,
  DeleteActivityLogRequest,
  GetActivityLogRequest,
  toActivityLogResponse,
} from "../model/activity-log-model";
import { ActivityLogValidation } from "../validation/activity-log-validation";
import { Validation } from "../validation/validation";

export class ActivityLogService {
  static async create(
    request: CreateActivityLogRequest
  ): Promise<ActivityLogResponse> {
    const createActivityLogRequest = Validation.validate(
      ActivityLogValidation.CREATE,
      request
    );

    const activityLog = await prisma.activityLog.create({
      data: createActivityLogRequest,
    });

    return toActivityLogResponse(activityLog);
  }

  static async checkActivityLogMustExists(
    userId: number
  ): Promise<ActivityLog[]> {
    const activityLogs = await prisma.activityLog.findMany({
      where: {
        userId: userId,
      },
    });

    if (!activityLogs || activityLogs.length === 0) {
      throw new ResponseError(404, "Activity log not found");
    }

    return activityLogs;
  }
  static async get(user: User, userId: number): Promise<ActivityLogResponse[]> {
    const activityLogs = await this.checkActivityLogMustExists(userId);
    return activityLogs.map(toActivityLogResponse);
  }
  static async remove(
    user: User,
    userId: number
  ): Promise<{ deleted: number }>{
    await this.checkActivityLogMustExists(userId);

    const activityLogs = await prisma.activityLog.deleteMany({
      where: {
        userId: userId,
      },
    });

    return  { deleted: activityLogs.count };
  }
}
