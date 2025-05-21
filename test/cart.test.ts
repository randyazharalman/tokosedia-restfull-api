import supertest from "supertest";
import { CartTest, UserTest } from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { CartService } from "../src/service/cart-service";

describe("POST /api/users/:userId/cart", () => {
  beforeEach( async () => {
    await UserTest.create()
    
  });
  afterEach( async () => {
    await CartTest.delete();
    await UserTest.delete()
    
  });

  it('should be create cart', async() => {
    const user = await UserTest.get()
    const response = await supertest(web)
    .post(`/api/users/${user.id}/carts`)
    .set("X-API-TOKEN", "test")
    .send({
      userId: user.id
    })

    console.log(response.body);
    logger.debug(response.body);
    expect(response.status).toBe(200)
    expect(response.body.data.userId).toBeDefined()
  });
  it('should be reject create cart', async() => {
    const user = await UserTest.get()
    const response = await supertest(web)
    .post(`/api/users/${user.id}/carts`)
    .set("X-API-TOKEN", "test")
    .send({
      userId: user.id
    })

    console.log(response.body);
    logger.debug(response.body);
    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
  });
  
});
