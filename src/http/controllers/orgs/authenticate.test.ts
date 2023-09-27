import { app } from "@/app";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import request from "supertest";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate a organization", async () => {
    await request(app.server).post("/orgs").send({
      name_of_representative: "Fulano",
      email: "orgr@email.com",
      address: "Vila de Viana ",
      phone: "+244930258963",
      password: "123456",
      nif: "123456789wlmnb",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "orgr@email.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
