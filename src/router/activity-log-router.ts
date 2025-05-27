import express from "express"
import { ActivityLogController } from "../controller/activity-log-controller";


export const activityLogRouter = express.Router();

activityLogRouter.get('/api/users/:userId/activity-logs', ActivityLogController.get)
activityLogRouter.post('/api/users/:userId/activity-logs', ActivityLogController.create)
activityLogRouter.delete('/api/users/:userId/activity-logs', ActivityLogController.delete)