import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { prisma } from "../src/application/database";
import { CategoryTest, ProductTest, UserTest } from "./test-util";

describe("POST /api/products", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ProductTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
    await ProductTest.deleteAll();
  });

  it("should be reject create product if sku or title or brand is exist", async () => {
    const category = await CategoryTest.get()
    const response = await supertest(web)
      .post("/api/products")
      .set("X-API-TOKEN", "test")
      .send({
        title: "title",
        price: 190,
        description: "desc",
        stock: 100,
        brand: "brand",
        tags: ["shoes", "bags"],
        color: ["black"],
        size: ["30", "40"],
        weight: 100,
        thumbnail: "https//thumbnail.com",
        images: ["https://images1.com", "https://images2.com"],
        sku: "sku-1",
        discountPercentage: 40,
        availabilityStatus: "available",
        shippingInformation: "3 hours delivered",
        returnPolicy: "return policy",
        warrantyInformation: "warranty",
        minimumOrderQuantity: 10,
        categoryId: 4,
      });
    console.log(response.body);
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined()
  });

  it("should be create new product", async () => {
    const response = await supertest(web)
      .post("/api/products")
      .set("X-API-TOKEN", "test")
      .send({
        title: "titlew",
        price: 190,
        description: "desc",
        stock: 100,
        brand: "brand",
        tags: ["shoes", "bags"],
        color: ["black"],
        size: ["30", "40"],
        weight: 100,
        thumbnail: "https//thumbnail.com",
        images: ["https://images1.com", "https://images2.com"],
        sku: "sku-2",
        discountPercentage: 40,
        availabilityStatus: "available",
        shippingInformation: "3 hours delivered",
        returnPolicy: "return policy",
        warrantyInformation: "warranty",
        minimumOrderQuantity: 10,
        categoryId: 4,
      });

    console.log(response.body);
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/products/:productId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ProductTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
    await ProductTest.deleteAll();
  });

  it("should be able get product", async () => {
    const product = await ProductTest.get();
    const response = await supertest(web)
      .get(`/api/products/${product.id}`)
      .set("X-API-TOKEN", "test");

    console.log(response.body);
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.title).toBe(product.title);
  });

  it("should be wrong id", async () => {
    const product = await ProductTest.get();
    const response = await supertest(web)
      .get(`/api/products/${product.title}`)
      .set("X-API-TOKEN", "test");

    console.log(response.body);
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("DELETE /api/products/:productId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ProductTest.create();
  });

  afterEach(async () => {
    await ProductTest.deleteAll();
    await UserTest.delete();
  });

  it("should be succesfully remove product by id", async () => {
    const product = await ProductTest.get();
    const response = await supertest(web)
      .delete(`/api/products/${product.id}`)
      .set("X-API-TOKEN", "test");

    console.log(response.body);
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });
});

describe("PUT /api/products/:productId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ProductTest.create();
  });

  afterEach(async () => {
    await ProductTest.deleteAll();
    await UserTest.delete();
  });

  it("should be updated a product by id", async () => {
    const product = await ProductTest.get();
    const response = await supertest(web)
      .put(`/api/products/${product.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        title: "test title",
        price: 190,
        description: "desc",
        stock: 100,
        brand: "brand",
        tags: ["shoes", "bags"],
        color: ["black"],
        size: ["30", "40"],
        weight: 100,
        thumbnail: "https//thumbnail.com",
        images: ["https://images1.com", "https://images2.com"],
        sku: "sku-1",
        discountPercentage: 40,
        availabilityStatus: "available",
        shippingInformation: "3 hours delivered",
        returnPolicy: "return policy",
        warrantyInformation: "warranty",
        minimumOrderQuantity: 10,
        categoryId: 4,
      });

    console.log(response.body)
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(product.id);
    expect(response.body.data.title).toBe("test title");
    expect(response.body.data.price).toBe(190);
    expect(response.body.data.description).toBe("desc");
    expect(response.body.data.stock).toBe(100);
    expect(response.body.data.brand).toBe("brand");
    expect(response.body.data.tags).toEqual(["shoes", "bags"]);
    expect(response.body.data.color).toEqual(["black"]);
    expect(response.body.data.size).toEqual(["30", "40"]);
    expect(response.body.data.weight).toBe(100);
    expect(response.body.data.thumbnail).toBe("https//thumbnail.com");
    expect(response.body.data.images).toEqual([
      "https://images1.com",
      "https://images2.com",
    ]);
    expect(response.body.data.sku).toBe("sku-1");
    expect(response.body.data.discountPercentage).toBe(40);
    expect(response.body.data.availabilityStatus).toBe("available");
    expect(response.body.data.shippingInformation).toBe("3 hours delivered");
    expect(response.body.data.returnPolicy).toBe("return policy");
    expect(response.body.data.warrantyInformation).toBe("warranty");
    expect(response.body.data.minimumOrderQuantity).toBe(10);
    expect(response.body.data.categoryId).toBeDefined();
  });
});
