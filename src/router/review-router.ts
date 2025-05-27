import express from "express"
import { ReviewController } from "../controller/review-controller";


export const reviewRouter = express.Router();

reviewRouter.post('/api/reviews', ReviewController.create)
reviewRouter.get('/api/products/:productId/reviews', ReviewController.get)
reviewRouter.put('/api/reviews/:reviewId', ReviewController.update)
reviewRouter.delete('/api/reviews/:reviewId', ReviewController.delete)