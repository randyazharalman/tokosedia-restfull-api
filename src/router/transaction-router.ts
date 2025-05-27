import express from "express"
import { TransactionController } from "../controller/transaction-controller";


export const transactionRouter = express.Router();

transactionRouter.get('/api/users/:userId/transactions', TransactionController.getByUserId)
transactionRouter.post('/api/users/:userId/transactions', TransactionController.create)
transactionRouter.put('/api/transactions/:transactionId', TransactionController.update)
transactionRouter.delete('/api/transactions/:transactionId', TransactionController.delete)


