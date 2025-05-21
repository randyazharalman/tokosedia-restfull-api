import supertest from "supertest";
import { logger } from "../src/application/logging";
import { web } from "../src/application/web";
import { ProductTest, ReviewTest, UserTest } from "./test-util";

describe("POST /api/reviews/", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ProductTest.create();
  });

  afterEach(async () => {
    await ReviewTest.delete();
    await UserTest.delete();
    await ProductTest.deleteAll();
  });

  it("should be create new review", async () => {
    const user = UserTest.get();
    const product = ProductTest.get();
    const response = await supertest(web)
      .post("/api/reviews")
      .set("X-API-TOKEN", "test")
      .send({
        reviewerName: (await user).name,
        reviewerEmail: (await user).email,
        comment: "test comment",
        rating: 5,
        date: new Date().toISOString(),
        productId: (await product).id,
        userId: (await user).id,
      });
    console.log(response.body);
    console.log(response.error);
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.reviewerName).toBeDefined();
    expect(response.body.data.reviewerEmail).toBeDefined();
    expect(response.body.data.comment).toBe("test comment");
    expect(response.body.data.rating).toBe(5);
    expect(response.body.data.date).toBeDefined();
    expect(response.body.data.productId).toBeDefined();
    expect(response.body.data.userId).toBeDefined();
  });
});

describe('GET /api/products/:productId/reviews', () => {
  beforeEach(async () => {
      await UserTest.create();
      await ProductTest.create();
      await ReviewTest.create();
    });

    afterEach(async () => {
      await ReviewTest.delete();
      await UserTest.delete();
      await ProductTest.deleteAll();
    });

    it("should be able get product review", async () => {
       const product = await ProductTest.get();
       const review = await ReviewTest.get()
       const response = await supertest(web)
         .get(`/api/products/${product.id}/reviews`)
         .set("X-API-TOKEN", "test");
   
       console.log(response.body);
       logger.debug(response.body);
       expect(response.status).toBe(200);
       expect(response.body.data.id).toBeDefined();
       expect(response.body.data.reviewerName).toBe(review.reviewerName);
     });
})

describe("PUT /api/products/:productId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ProductTest.create();
    await ReviewTest.create();
  });

  afterEach(async () => {
    await ReviewTest.delete();
    await ProductTest.deleteAll();
    await UserTest.delete();
  });

  it("should be updated a review by id", async () => {
    const review = await ReviewTest.get();
    const user = await UserTest.get();
    const product = await ProductTest.get();
    const response = await supertest(web)
      .put(`/api/reviews/${review.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        // id: review.id,
        reviewerName: user.name,
        reviewerEmail: user.email,
        comment: "this is test comment",
        rating: 3,
        date: new Date().toISOString(),
        productId: product.id,
        userId: user.id,
      });
    console.log(review.id);
    console.log(response.body);
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.reviewerName).toBe(user.name);
    expect(response.body.data.reviewerEmail).toBe(user.email);
    expect(response.body.data.comment).toBe("this is test comment");
    expect(response.body.data.rating).toBe(3);
    expect(response.body.data.date).toBeDefined();
    expect(response.body.data.productId).toBeDefined();
    expect(response.body.data.userId).toBeDefined();
  });

  it("should be reject updated a review by id", async () => {
    const review = await ReviewTest.get();
    const user = await UserTest.get();
    const product = await ProductTest.get();
    const response = await supertest(web)
      .put(`/api/reviews/${review.id}d`)
      .set("X-API-TOKEN", "test")
      .send({
        // id: review.id,
        reviewerName: user.name,
        reviewerEmail: user.email,
        comment: "this is test comment",
        rating: 3,
        date: new Date().toISOString(),
        productId: product.id,
        userId: user.id,
      });
    console.log(review.id);
    console.log(response.body);
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined()
  });
});

describe("DELETE /api/reviews/:reviewId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ProductTest.create();
    await ReviewTest.create();
  });

  afterEach(async () => {
    await ReviewTest.delete();
    await ProductTest.deleteAll();
    await UserTest.delete();
  });

  it("should be succesfully remove review by id", async () => {
    const review = await ReviewTest.get();
    const response = await supertest(web)
      .delete(`/api/reviews/${review.id}`)
      .set("X-API-TOKEN", "test");

    console.log(response.body);
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });
});
