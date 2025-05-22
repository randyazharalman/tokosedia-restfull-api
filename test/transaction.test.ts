import supertest from "supertest";
import { web } from "../src/application/web";
import { ProductTest, UserTest } from "./test-util";
import { logger } from "../src/application/logging";

describe("POST /api/users/:userId/transactions", () => {
  it("should create new transaction", async () => {
    const user = await UserTest.get();
    const product = await ProductTest.get();
    const response = await supertest(web)
      .post(`/api/users/${user.id}/transactions`)
      .set("X-API-TOKEN", "test")
      .send({
        userId: user.id,
        status: "pending",
        total: 1,
        items: [{
          productId: product.id,
          quantity: 10,
          priceAtPurchase:100,
        }],
      });

      logger.debug(response.body)
      console.log(response.body);
      expect(response.status).toBe(200)
      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.userId).toBe(user.id)
      expect(response.body.data.status).toBe("pending")
      expect(response.body.data.total).toBe(1)
      expect(response.body.data.items).toBeDefined()
  });
});
describe("GET /api/users/:userId/transactions", () => {
  it("should create new transaction", async () => {
    const user = await UserTest.get();
    const response = await supertest(web)
      .get(`/api/users/${user.id}/transactions`)
      .set("X-API-TOKEN", "test")


      logger.debug(response.body)
      console.log(response.body);
      expect(response.status).toBe(200)
      expect(response.body.data).toBeDefined()
  });
});
describe("PUT /api/transactions/:transactionId", () => {
  it("should update transaction", async () => {
    const user = await UserTest.get();
    const product = await ProductTest.get()
    const response = await supertest(web)
      .put(`/api/transactions/${1}`)
      .set("X-API-TOKEN", "test")
      .send({
        userId: user.id,
        status: "cancelled",
        total: 1,
        items: [{
          productId: product.id,
          quantity: 10,
          priceAtPurchase:100,
        }],
      });

      logger.debug(response.body)
      console.log(response.body);
      expect(response.status).toBe(200)
      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.userId).toBe(user.id)
      expect(response.body.data.status).toBe("cancelled")
      expect(response.body.data.total).toBe(1)
      expect(response.body.data.items).toBeDefined()
  });
});
describe("DELETE /api/transactions/:transactionId", () => {
  it("should deleted transaction", async () => {
    const user = await UserTest.get();
    const product = await ProductTest.get()
    const response = await supertest(web)
      .delete(`/api/transactions/${1}`)
      .set("X-API-TOKEN", "test")
      .send({
        userId: user.id
      })


      logger.debug(response.body)
      console.log(response.body);
      expect(response.status).toBe(200)
      expect(response.body.data).toBeDefined()

  });
});
