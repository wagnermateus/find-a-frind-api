import { OrgsRepository } from "@/Repositories/orgs-repository";
import { describe, it, beforeEach, expect } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryOrgsRepository } from "@/Repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./Errors/invalid-credencials-error";

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
      email: "org@email.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await orgsRepository.create({
      name_of_representative: "Fulano",
      email: "org@email.com",
      address: "Vila de Viana ",
      phone: "+244 930258963",
      password_hash: await hash("123456", 6),
      nif: "0489LDN78B",
    });

    await expect(
      sut.execute({
        email: "wrong@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await orgsRepository.create({
      name_of_representative: "Fulano",
      email: "org@email.com",
      address: "Vila de Viana ",
      phone: "+244 930258963",
      password_hash: await hash("123456", 6),
      nif: "0489LDN78B",
    });

    await expect(
      sut.execute({
        email: "org@email.com",
        password: "wrong_password",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
