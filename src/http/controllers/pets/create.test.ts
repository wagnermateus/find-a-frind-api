import { app } from "@/app";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "utlis/test/create-and-authenticate-orga";
import dayjs from "dayjs";

describe("Create Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a pet", async () => {
    const { orgId, token } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        org_id: orgId,
        name: "picuto",
        about: "sweet",
        birth: dayjs("2021-02-05"),
        energy_level: "HIGH",
        level_of_independence: "LOW",
        city: "Luanda",
      });

    expect(response.statusCode).toEqual(201);
  });
});
