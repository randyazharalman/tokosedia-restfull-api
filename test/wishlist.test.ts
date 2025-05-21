import supertest from "supertest";
import { web } from "../src/application/web";
import { ProductTest, UserTest, WishlistTest } from "./test-util";
import { logger } from "../src/application/logging";

describe("POST /api/users/:userId/wishlist", () => {
  // let user: any, product: any;
  beforeEach(async () => {});

  afterEach(async () => {
    // await WishlistTest.delete();
    // await ProductTest.deleteAll();
    // await UserTest.delete();
  });
  it("should create a wishlist for user with product", async () => {
    const user = await UserTest.get();
    const product = await ProductTest.get(); 
    const response = await supertest(web)
      .post(`/api/users/${user.id}/wishlist`)
      .set("X-API-TOKEN", "test")
      .send({
        userId: user.id,
        items: [product.id],
      });

    logger.debug(response.body);
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.userId).toBe(user.id);
    expect(response.body.data.items).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: product.id })])
    );
  });
});

describe("GET /api/users/:userId/wishlist", () => {
  it("should get wishlist by user ID", async () => {
    const user = await UserTest.get();
    const response = await supertest(web)
      .get(`/api/users/${user.id}/wishlist`)
      .set("X-API-TOKEN", "test")
      .send({
        userId: user.id,
      });

    logger.debug(response.body);
    console.log(JSON.stringify(response.body, null, 2));

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.userId).toBeDefined();
    expect(response.body.data.items).toBeDefined();
  });
  it("should reject get wishlist", async () => {
    const user = await UserTest.get();
    const response = await supertest(web)
      .get(`/api/users/${user.id * 100}/wishlist`)
      .set("X-API-TOKEN", "test")
      .send({
        userId: user.id,
      });

    logger.debug(response.body);
    console.log(JSON.stringify(response.body, null, 2));

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();

  });

});

describe("DELETE /api/users/:userId/wishlist", () => {
  it("should delete wishlist by user ID", async () => {
    const user = await UserTest.get();
    const response = await supertest(web)
      .delete(`/api/users/${user.id}/wishlist`)
      .set("X-API-TOKEN", "test")
      .send({
        userId: user.id,
      });

    logger.debug(response.body);
    console.log(JSON.stringify(response.body, null, 2));

    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });
 it("should reject delete wishlist", async () => {
    const user = await UserTest.get();
    const response = await supertest(web)
      .delete(`/api/users/${user.id * 100}/wishlist`)
      .set("X-API-TOKEN", "test")
      .send({
        userId: user.id,
      });

    logger.debug(response.body);
    console.log(JSON.stringify(response.body, null, 2));

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();

  });

});