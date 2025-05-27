import supertest from "supertest"
import { web } from "../src/application/web"
import { AddressTest, ShippingTest, TransactionTest, UserTest } from "./test-util";
import { logger } from "../src/application/logging";

describe('POST /api/shippings', () => {
  
  it('should create new shipping', async () => {
    const transaction = await TransactionTest.get();
    const address = await AddressTest.get();
      const request = {
        transactionId: transaction?.id,
        trackingCode: "tctest123",
        address: address.address,
        courier: "JNE",
        shippedAt: new Date().toISOString(),
      }
      const response = await supertest(web)
      .post("/api/shippings")
      .set("X-API-TOKEN", "test")
      .send(request)

      logger.info(response.body)
      console.log(response.body)
      expect(response.status).toBe(200)
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.transactionId).toBe(request.transactionId);
      expect(response.body.data.trackingCode).toBe(request.trackingCode);
      expect(response.body.data.address).toBe(request.address);
      expect(response.body.data.courier).toBe(request.courier);
      expect(response.body.data.shippedAt).toBe(request.shippedAt);

  });
  it('should fail to create a new shipment because the shipment transaction already exists', async () => {
    const transaction = await TransactionTest.get();
    const address = await AddressTest.get();
      const request = {
        transactionId: transaction?.id,
        trackingCode: "tctest123",
        address: address.address,
        courier: "JNE",
        shippedAt: new Date().toISOString(),
      }
      const response = await supertest(web)
      .post("/api/shippings")
      .set("X-API-TOKEN", "test")
      .send(request)

      logger.info(response.body)
      console.log(response.body)
      expect(response.status).toBe(400)
      expect(response.body.errors).toBeDefined()

  });
  it('should fail to create a new shipment because the tracking code already exists', async () => {
    const transaction = await TransactionTest.get();
    const address = await AddressTest.get();
      const request = {
        transactionId: transaction?.id,
        trackingCode: "tctest123",
        address: address.address,
        courier: "JNE",
        shippedAt: new Date().toISOString(),
      }
      const response = await supertest(web)
      .post("/api/shippings")
      .set("X-API-TOKEN", "test")
      .send(request)

      logger.info(response.body)
      console.log(response.body)
      expect(response.status).toBe(400)
      expect(response.body.errors).toBeDefined()

  });
})


describe('GET /api/shippings/:shippingId', () => {
  it('should get shipping by shipping ID', async () => {
    const shipping = await ShippingTest.get()

    const validResponse = {
      id: shipping.id,
      transactionId: shipping.transactionId,
        trackingCode: shipping.trackingCode,
        address: shipping.address,
        courier: shipping.courier,
        shippedAt: shipping.shippedAt?.toISOString(),
        createdAt: shipping.createdAt.toISOString(), 
        updatedAt: shipping.updatedAt.toISOString()
    }
    const response = await supertest(web)
    .get(`/api/shippings/${shipping.id}`)
    .set("X-API-TOKEN", "test")

    expect(response.status).toBe(200)
    expect(response.body.data).toMatchObject(validResponse)
  });
  it('should fail to get shipment with shipment ID', async () => {
    const shipping = await ShippingTest.get()
    const response = await supertest(web)
    .get(`/api/shippings/${shipping.id * 100}`)
    .set("X-API-TOKEN", "test")

    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  });
})


describe('PUT /api/shippings/:shippingId', () => {
  

  it('should update shipping', async () => {
    const shipping = await ShippingTest.get();
    const response = await supertest(web)
    .put(`/api/shippings/${shipping.id}`)
    .set("X-API-TOKEN", "test")
    .send({
      address: "Bandung",
      courier: "TIKI",
    })

    logger.info(response.body)
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });
})
