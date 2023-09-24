import { OrgsRepository } from "@/Repositories/orgs-repository";
import { describe, it, beforeEach, expect } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryOrgsRepository } from "@/Repositories/in-memory/orgs-repository";
import { hash } from "bcryptjs";

let orgsRepository: OrgsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgsRepository);
  });

  it("should be able to authenticate", async () => {
    await orgsRepository.create({
      name_of_representative: "Fulano",
      email: "org@email.com",
      address: "Vila de Viana ",
      phone: "+244 930258963",
      password_hash: await hash("123456", 6),
      nif: "0489LDN78B",
    });

    const { org } = await sut.execute({
      email: "remar@email.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });
});
