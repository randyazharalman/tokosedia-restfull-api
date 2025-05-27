import supertest from "supertest";
import { web } from "../src/application/web";
import { PaymentTest, TransactionTest, UserTest } from "./test-util";
import { logger } from "../src/application/logging";
import { prisma } from "../src/application/database";

describe("POST /api/payments", () => {
  beforeEach(async () => {
    // await UserTest.create();
  });

  afterEach(async () => {
    // await UserTest.delete();
  });

  it("should create payment", async () => {
    const transaction = await TransactionTest.get()
    const request = {
      transactionId: Number(transaction?.id),
      method: "CREDIT_CARD",
      amount: 10000,
    };

    const response = await supertest(web)
      .post("/api/payments")
      .set("X-API-TOKEN", "test")
      .send(request);

    logger.info(response.body)
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.transactionId).toBe(request.transactionId);
    expect(response.body.data.method).toBe(request.method);
    expect(response.body.data.amount).toBe(request.amount);
  });


  it("should not delete payment if payment id is invalid", async () => {
    await supertest(web)
      .delete("/api/payments/999")
      .expect(404);
  });
});


describe('GET /api/payment/:paymentId', () => {

   it("should get payment", async () => {
     const transaction = await TransactionTest.get() 
     const payment = await PaymentTest.get();

     console.log(payment);
     const response = await supertest(web)
     .get(`/api/payments/${payment.id}`)
     .set("X-API-TOKEN", "test")
     
     const validData = {
       transactionId: transaction?.id,
       method: "CREDIT_CARD",
       paidAt: null,
       amount: 10000,
     }
     logger.info(response)
     console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(payment.id);
    expect(response.body.data.transactionId).toBe(validData.transactionId);
    expect(response.body.data.method).toBe(validData.method);
    expect(response.body.data.amount).toBe(validData.amount);
  });

  it("should not get payment if payment id is invalid", async () => {
    await supertest(web)
      .get("/api/payments/999")
      .set("X-API-TOKEN", "test")
      .expect(404);
  });
})

describe('PUT /api/payments/:paymentId', () => {
   it("should update payment", async () => {
    const payment = await PaymentTest.get()
    const transaction = await TransactionTest.get()

    const request = {
      amount: 120000,
    };

    const validData = {
      transactionId: transaction?.id,
      method: payment.method,
      paidAt: null,
      amount: request.amount
    }

    const response = await supertest(web)
      .put(`/api/payments/${payment.id}`)
      .set("X-API-TOKEN", "test")
      .send(request);
      
    logger.info(response.body)
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(payment.id);
    expect(response.body.data).toMatchObject(validData);

  });

    it("should not update payment if payment id is invalid", async () => {
      const payment = await PaymentTest.get()
    const request = {
      method: "BANK_TRANSFER",
      amount: 20000,
    };

    await supertest(web)
      .put(`/api/payments/${payment.id * 100}`)
      .set("X-API-TOKEN", "test")
      .send(request)
      .expect(404);
  });
})

describe('DELETE /api/payments/:paymentId', () => {
    it("should delete payment", async () => {
    
    const payment = await PaymentTest.get()

    const response = await supertest(web)
      .delete(`/api/payments/${payment.id}`)
      .set("X-API-TOKEN", "test")

    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");

  });
})

