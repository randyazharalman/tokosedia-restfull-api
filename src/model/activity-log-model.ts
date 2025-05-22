import { ActivityLog } from "@prisma/client";


export type ActivityLogResponse = {
  id: number;
  userId: number;
  action: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateActivityLogRequest = {
  userId: number;
  action: string;
}

export type GetActivityLogRequest = {
  id: number,
  userId: number
}

export type DeleteActivityLogRequest = GetActivityLogRequest

export function toActivityLogResponse(activityLog: ActivityLog): ActivityLogResponse {
  return {
    id: activityLog.id,
    userId: activityLog.userId,
    action: activityLog.action,
    createdAt: activityLog.createdAt.toISOString(),
    updatedAt: activityLog.updatedAt.toISOString()
  }
}