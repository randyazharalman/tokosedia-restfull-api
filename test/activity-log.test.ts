import supertest from "supertest";
import { UserTest } from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe('POST /api/users/:userId/activity-logs', () => {
  
  it('should create new activity log', async () => {
    const user = await UserTest.get();
    const response = await supertest(web)
    .post(`/api/users/${user.id}/activity-logs`)
    .set("X-API-TOKEN", "test")
    .send({
      userId: user.id,
      action: "test",
    })

    logger.debug(response.body)
    console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.userId).toBe(user.id)
    

  });
})
describe('GET /api/users/:userId/activity-logs', () => {
    it('should get activity logs', async () => {
    const user = await UserTest.get();
    const response = await supertest(web)
    .get(`/api/users/${user.id}/activity-logs`)
    .set("X-API-TOKEN", "test")


    logger.debug(response.body)
    console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data[0].userId).toBe(user.id)
    

  });
    it('should fail to get activity log', async () => {
    const user = await UserTest.get();
    const response = await supertest(web)
    .get(`/api/users/${user.id*10}/activity-logs`)
    .set("X-API-TOKEN", "test")


    logger.debug(response.body)
    console.log(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  });
})
describe('DELETE /api/users/:userId/activity-logs', () => {
   it('should fail to get activity log', async () => {
    const user = await UserTest.get();
    const response = await supertest(web)
    .delete(`/api/users/${user.id}/activity-logs`)
    .set("X-API-TOKEN", "test")


    logger.debug(response.body)
    console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data).toBe("OK")
  });
})


