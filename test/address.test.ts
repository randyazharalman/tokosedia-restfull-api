import supertest from "supertest";
import { AddressTest, UserTest } from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe('POST /api/users/:userId/addresses', () => {
   beforeEach(async () => {
      // await UserTest.create();
      // await AddressTest.create()
    });
  
    afterEach(async () => {
      await AddressTest.delete() 
      // await UserTest.delete();
    });

   it('should be create address', async() => {
    const user = await UserTest.get()
     const response = await supertest(web)
    .post(`/api/users/${user.id}/addresses`)
    .set("X-API-TOKEN", "test")
    .send({

        label: "cicalung",
        address: "Sukaresik",
        city: "Tasikmalaya",
        country: "Indonesia",
        postalCode: "46159",
        userId: user.id
      
    })
    console.log(response.body);
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.label).toBe("cicalung");
    expect(response.body.data.address).toBe("Sukaresik");
    expect(response.body.data.city).toBe("Tasikmalaya");
    expect(response.body.data.country).toBe("Indonesia");
    expect(response.body.data.postalCode).toBe("46159");
    expect(response.body.data.userId).toBeDefined();

   });

   it('should be reject create addres if user have an address', async() => {
    const user = await UserTest.get();
    await AddressTest.create()
  const response = await supertest(web)
    .post(`/api/users/${user.id}/addresses`)
    .set("X-API-TOKEN", "test")
    .send({
      label: "Alamat 2",
      address: "Jl. Kedua",
      city: "Kota B",
      country: "Indonesia",
      postalCode: "67890",
      userId: user.id
    });
    console.log(response.body);
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
   });
})




describe('PUT /api/users/:userId/addresses/:addressId', () => {
  beforeEach(async () => {
      await UserTest.create();
      await AddressTest.create()
    });
  
    afterEach(async () => {
      await AddressTest.delete() 
      await UserTest.delete();
    });

     it('should be update address', async() => {
    const user = await UserTest.get()
    const address = await AddressTest.get()
     const response = await supertest(web)
    .put(`/api/users/${user.id}/addresses/${address.id}`)
    .set("X-API-TOKEN", "test")
    .send({
        label: "cicalung",
        address: "Sukaresik",
        city: "Bandung",
        country: "Indonesia",
        postalCode: "46159",
        userId: user.id
    })
    console.log(address.id);
    console.log(response.body);
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.label).toBe("cicalung");
    expect(response.body.data.address).toBe("Sukaresik");
    expect(response.body.data.city).toBe("Bandung");
    expect(response.body.data.country).toBe("Indonesia");
    expect(response.body.data.postalCode).toBe("46159");
    expect(response.body.data.userId).toBeDefined();

   });
})


describe('DELETE /api/users/:userId/addresses/:addressId', () => {
  beforeEach(async () => {
      await UserTest.create();
      await AddressTest.create()
    });
  
    afterEach(async () => {
      await AddressTest.delete() 
      await UserTest.delete();
    });

     it('should be delete address', async() => {
    const user = await UserTest.get()
    const address = await AddressTest.get()
     const response = await supertest(web)
    .delete(`/api/users/${user.id}/addresses/${address.id}`)
    .set("X-API-TOKEN", "test")

    console.log(user.id);
    console.log(address.id);
    console.log(response.body);
    console.log(response.body.response);
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");


   });
})
