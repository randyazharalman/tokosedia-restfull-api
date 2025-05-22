import { prisma } from "../application/database";
import { ResponseError } from "../error/response-error";
import { toTransactionResponse } from "../helper/mapper";
import { CreateTransactionRequest, DeleteTransactionRequest, TransactionResponse, UpdateTransactionRequest } from "../model/transaction-model";
import { TransactionValidation } from "../validation/transaction-validation";
import { Validation } from "../validation/validation";

export class TransactionService {
  static async create(request: CreateTransactionRequest): Promise<TransactionResponse> {
    const createTransactionRequest = Validation.validate(TransactionValidation.CREATE, request)
 
    const transaction = await prisma.transaction.create({
      data: {
        userId: createTransactionRequest.userId,
        status: createTransactionRequest.status,
        total: createTransactionRequest.total,
        items: {
          create: createTransactionRequest.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return toTransactionResponse(transaction);
  }

  static async transactionIsExists(transactionId: number ){
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: Number(transactionId)
      }
    })
    
    if(!transaction) throw new ResponseError(404, "Transaction not found")
  }

  static async getByUser(userId: number): Promise<TransactionResponse[]> {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        items: { include: { product: true } },
      },
    });

    return transactions.map(toTransactionResponse);
  }
  
  static async update(request: UpdateTransactionRequest): Promise<TransactionResponse> {
    const data = Validation.validate(TransactionValidation.UPDATE, request)

    await this.transactionIsExists(data.id)

    const transaction = await prisma.transaction.update({
      where: {
        id: data.id
      },
      data: {
        status: data.status,
        total: data.total
      },
      include : {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return toTransactionResponse(transaction)
  }
  static async remove(request: DeleteTransactionRequest): Promise<TransactionResponse> {
    const data = Validation.validate(TransactionValidation.DELETE, request)

    await this.transactionIsExists(data.id)

    await prisma.transactionItem.deleteMany({ where: { transactionId: data.id } });

    const transaction = await prisma.transaction.delete({
      where: { id: data.id },
      include: { items: true },
    });

    return toTransactionResponse(transaction)
  }
}