import { app } from "@/app";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "utlis/test/create-and-authenticate-orga";
import dayjs from "dayjs";
import { beforeEach } from "vitest";

describe("Search Pets (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
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
        level_of_independence: "MEDIUM",
        city: "Benguela",
      });
  });
  it("should be able to search pets by filter", async () => {
    const response = await request(app.server)
      .get("/pets/search")
      .query({
        energy_level: "HIGH",
        level_of_independence: "LOW",
      })
      .send();

    expect(response.body.pets).toHaveLength(2);
  });

  it.skip("should be able to search pets with optinal filters", async () => {
    const response = await request(app.server)
      .get("/pets/search")
      .query({
        level_of_independence: "MEDIUM",
      })
      .send();

    expect(response.body.pets).toHaveLength(1);
  });
});
