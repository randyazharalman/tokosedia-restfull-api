import supertest from "supertest";
import { web } from "../src/application/web";
import { CartService } from "../src/service/cart-service";
import { CartTest, ProductTest } from "./test-util";
import { logger } from "../src/application/logging";

describe('POST /api/cart/items', () => {
      beforeEach(async () => {
        // await CartTest.create()
        // await ProductTest.create()
      })

      afterEach(async ()=> {

      })

      it('should be create new cart item', async () => {
        const cart = await CartTest.get()
        const product = await ProductTest.get()
        const response = await supertest(web)
        .post('/api/cart/items')
        .set("X-API-TOKEN", "test")
        .send({
            cartId: cart.id,
            productId: product.id,
            quantity: 100,
        })
        
        logger.debug(response.body)
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.cartId).toBe(cart.id);
        expect(response.body.data.productId).toBe(product.id);
        expect(response.body.data.quantity).toBe(100);

      });
})



describe('PUT /api/cart/items', () => {
      beforeEach(async () => {
        // await CartTest.create()
        // await ProductTest.create()
      })

      afterEach(async ()=> {

      })

      it('should be upate cart item', async () => {
        const cart = await CartTest.get()
        const product = await ProductTest.get()
        const response = await supertest(web)
        .put('/api/cart/items')
        .set("X-API-TOKEN", "test")
        .send({
            cartId: cart.id,
            productId: product.id,
            quantity: 50,
        })
        
        logger.debug(response.body)
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.cartId).toBe(cart.id);
        expect(response.body.data.productId).toBe(product.id);
        expect(response.body.data.quantity).toBe(50);

      });
})


describe('DELETE /api/cart/items', () => {
  // beforeEach(async () => {
  //     await UserTest.create();
  //     await AddressTest.create()
  //   });
  
    // afterEach(async () => {
    //   await AddressTest.delete() 
    //   await UserTest.delete();
    // });

     it('should be delete cart item', async() => {
       const cart = await CartTest.get()
        const product = await ProductTest.get() 
        const response = await supertest(web)
    .delete(`/api/cart/items`)
    .set("X-API-TOKEN", "test")
    .send({
      cartId: cart.id,
      productId: product.id
    })

    console.log(response.body);
    console.log(response.body.response);
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");


   });
})
