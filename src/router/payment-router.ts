import express from "express";
import { PaymentController } from "../controller/payment-controller";

export const paymentRouter = express.Router();

paymentRouter.post("/api/payments", PaymentController.create);
paymentRouter.get("/api/payments/:paymentId", PaymentController.get);
// paymentRouter.get("/api/payments/", PaymentController.getAll);
// paymentRouter.get("/api/payments/transactions/:transactionId") // get payment by transaction id
paymentRouter.put("/api/payments/:paymentId", PaymentController.update);
paymentRouter.delete("/api/payments/:paymentId",PaymentController.delete);

