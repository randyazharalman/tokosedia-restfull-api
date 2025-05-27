import express from "express"
import { UserController } from "../controller/user-contolerr";


export const userRouter = express.Router();

userRouter.get('/api/users/current', UserController.get)
userRouter.patch('/api/users/current', UserController.update)
userRouter.delete('/api/users/current', UserController.logout)
