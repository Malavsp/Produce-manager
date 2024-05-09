const request = require("supertest");
const app = require("../../src/app");

describe("Sanity check", () => {
  test("two plus four is 6", () => {
    expect(2 + 4).toBe(6);
  });
});

describe("Root Path Check", () => {
  test("Should return 200 to GET Req", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("Should return 404 to not GET req and response content-type should be json", async () => {
    const response = await request(app).put("/");
    expect(response.statusCode).toBe(404);
    expect(response.header["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Should return 404 for non-existing route", async () => {
    const response = await request(app).get("/unreal");
    expect(response.statusCode).toBe(404);
  });
});

describe("Error Path Check", () => {
  test("Should return 500 on GET req", async () => {
    const response = await request(app).get("/error");
    expect(response.statusCode).toBe(500);
  });

  test("Should return 404 to not GET req", async () => {
    const response = await request(app).put("/error");
    expect(response.statusCode).toBe(404);
  });
});
