const request = require("supertest");
const app = require("../../../src/app");
const utils = require("../../utils");

describe("Produce Routes", () => {
  beforeEach(async () => {
    await utils.createDB();
  });

  describe("GET /produce/id/:pluCode", () => {
    const dummyProduce = [
      {
        plu: 4104,
        name: "Apple",
        price: 6,
      },
      {
        plu: 4011,
        name: "Banana",
        price: 16.6,
      },
    ];

    beforeEach(async () => {
      await utils.addToDB("Produce", ["plu", "name", "price"], dummyProduce);
    });

    test("Should GET produce and status Code be 200", async () => {
      const response = await request(app).get(
        `/produce/id/${dummyProduce[0].plu}`
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.produce).toEqual(dummyProduce[0]);
    });

    test("Error of Produce not found on unknown Plu Code and Status to be 404", async () => {
      const unknownProduce = {
        plu: 4029,
        name: "Pinapple",
        price: 20.6,
      };
      const response = await request(app).get(
        `/produce/id/${unknownProduce.plu}`
      );
      expect(response.statusCode).toBe(404);
    });

    test("Error 400 On Invalid Input", async () => {
      const response = await request(app).get(`/produce/id/"invalid"`);
      expect(response.statusCode).toBe(400);
    });
  });

  describe("DELETE /produce/id/:pluCode", () => {
    const dummyProduce = [
      {
        plu: 4104,
        name: "Apple",
        price: 6,
      },
      {
        plu: 4011,
        name: "Banana",
        price: 16.6,
      },
      {
        plu: 4051,
        name: "Mango",
        price: 26,
      },
    ];

    beforeEach(async () => {
      await utils.addToDB("Produce", ["plu", "name", "price"], dummyProduce);
    });

    test("Should delete produce By Plu Code", async () => {
      const response = await request(app).delete(
        `/produce/id/${dummyProduce[1].plu}`
      );

      // will try to get deleted produce if deleted successfully will give undefined
      const delCheck = await utils.getRecordFromDB(
        "Produce",
        "plu",
        dummyProduce[1].plu
      );

      expect(response.statusCode).toBe(200);
      expect(delCheck).toBeUndefined();
    });

    test("Error on Invalid PLU input", async () => {
      const response = await request(app).delete(`/produce/id/"invalid"`);
      expect(response.statusCode).toBe(400);
    });
  });

  describe("POST produce/add", () => {
    const dummyProduce = [
      {
        plu: 4104,
        name: "Apple",
        price: 6,
      },
      {
        plu: 4011,
        name: "Banana",
        price: 16.6,
      },
      {
        plu: 4051,
        name: "Mango",
        price: 26,
      },
    ];

    beforeEach(async () => {
      await utils.addToDB("Produce", ["plu", "name", "price"], dummyProduce);
    });

    test("Add a new Produce", async () => {
      const newProduce = {
        plu: 4261,
        name: "Coconut",
        price: 2,
      };
      const response = await request(app).post(`/produce/add`).send(newProduce);

      const dbProduce = await utils.getRecordFromDB(
        "Produce",
        "name",
        "Coconut"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.Produce.lastInsertRowid).toBe(4); // as is 4th produce to be added in DB
      expect(dbProduce).toEqual(newProduce);
    });

    test("Should give 400 on missing data", async () => {
      const newProduce = {
        plu: 4261,
        name: "Coconut",
      };

      const response = await request(app).post(`/produce/add`).send(newProduce);
      expect(response.statusCode).toBe(400);
    });

    test("Should give error 409 Conflict on adding existing produce", async () => {
      const oldProduce = {
        plu: 4051,
        name: "Mango",
        price: 26,
      };
      const response = await request(app).post(`/produce/add`).send(oldProduce);
      expect(response.statusCode).toBe(409);
    });
  });

  describe("GET /produce/all", () => {
    const dummyProduce = [
      { plu: 4104, name: "Apple", price: 6 },
      { plu: 4011, name: "Banana", price: 16.6 },
      { plu: 4051, name: "Mango", price: 26 },
      { plu: 4030, name: "Kiwi", price: 5.6 },
      { plu: 4012, name: "Orange", price: 6 },
    ];

    beforeEach(async () => {
      await utils.addToDB("Produce", ["plu", "name", "price"], dummyProduce);
    });

    test("Get all produce", async () => {
      const response = await request(app).get(`/produce/all`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(dummyProduce);
    });
  });
});
