import { app } from "@/app";
import { it, describe, beforeAll, afterAll } from "vitest";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register a organization", async () => {
    console.log("ok");
  });
});
