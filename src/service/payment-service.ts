import { prisma } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreatePaymentRequest,
  UpdatePaymentRequest,
  GetPaymentRequest,
  DeletePaymentRequest,
  PaymentResponse,
  toPaymentResponse,
} from "../model/payment-model";
import { PaymentValidation } from "../validation/payment-validation";
import { Validation } from "../validation/validation";

export class PaymentService {
  static async create(request: CreatePaymentRequest): Promise<PaymentResponse> {
    const createPaymentRequest = Validation.validate(
      PaymentValidation.CREATE,
      request
    );

    const payment = await prisma.payment.create({
      data: createPaymentRequest,
    });

    return toPaymentResponse(payment);
  }

  static async get(request: GetPaymentRequest): Promise<PaymentResponse> {
    const getPaymentRequest = Validation.validate(
      PaymentValidation.GET,
      request
    );

    const payment = await prisma.payment.findUnique({
      where: {
        id: getPaymentRequest.id,
      },
    });

    if (!payment) {
      throw new ResponseError(404, "Payment not found");
    }

    return toPaymentResponse(payment);
  }

  static async update(request: UpdatePaymentRequest): Promise<PaymentResponse> {
    const updatePaymentRequest = Validation.validate(
      PaymentValidation.UPDATE,
      request
    );

    const paymentExists = await prisma.payment.findUnique({
      where: {
        id: updatePaymentRequest.id,
      },
    });

    if (!paymentExists) {
      throw new ResponseError(404, "Payment not found");
    }

    const payment = await prisma.payment.update({
      where: {
        id: updatePaymentRequest.id,
      },
      data: updatePaymentRequest,
    });

    return toPaymentResponse(payment);
  }

  static async delete(request: DeletePaymentRequest): Promise<PaymentResponse> {
    const deletePaymentRequest = Validation.validate(
      PaymentValidation.GET,
      request
    );

    const paymentExists = await prisma.payment.findUnique({
      where: {
        id: deletePaymentRequest.id,
      },
    });

    if (!paymentExists) {
      throw new ResponseError(404, "Payment not found");
    }

    const payment = await prisma.payment.delete({
      where: {
        id: deletePaymentRequest.id,
      },
    });

    return toPaymentResponse(payment);
  }
}
