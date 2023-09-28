import { app } from "@/app";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "utlis/test/create-and-authenticate-orga";
import dayjs from "dayjs";
import { beforeEach } from "node:test";

describe("Fecth Pets By City  (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get pets", async () => {
    const { orgId, token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        org_id: orgId,
        name: "pet-1",
        about: "sweet",
        birth: dayjs("2021-02-05"),
        energy_level: "HIGH",
        level_of_independence: "LOW",
        city: "Luanda",
      });

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        org_id: orgId,
        name: "pet-2",
        about: "sweet",
        birth: dayjs("2021-02-05"),
        energy_level: "HIGH",
        level_of_independence: "LOW",
        city: "Luanda",
      });

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        org_id: orgId,
        name: "pet-3",
        about: "sweet",
        birth: dayjs("2021-02-05"),
        energy_level: "HIGH",
        level_of_independence: "LOW",
        city: "Benguela",
      });

    const city = "Luanda";

    const response = await request(app.server).get(`/pets/${city}`);

    expect(response.body.pets).toHaveLength(2);
    expect(response.statusCode).toEqual(200);
    /*expect(response.body).toEqual([
      expect.objectContaining({ city: city }),
      expect.objectContaining({ city: city }),
    ]);*/
  });
});
