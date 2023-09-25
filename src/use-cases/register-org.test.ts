import { InMemoryOrgsRepository } from "@/Repositories/in-memory/orgs-repository";
import { it, describe, beforeEach, expect } from "vitest";
import { RegisteOrgUseCase } from "./register-org";
import { OrgAlreadyExistsError } from "./Errors/org-already-exists-error";
import { compare } from "bcryptjs";
import { InvalidAddress } from "./Errors/invalid-address-error";
import { InvalidPhone } from "./Errors/invalid-phone-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: RegisteOrgUseCase;
describe("Register Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new RegisteOrgUseCase(orgsRepository);
  });
  it("should to registe a Org", async () => {
    const { org } = await sut.execute({
      name_of_representative: "Fulano",
      email: "orgr@email.com",
      address: "Vila de Viana ",
      phone: "+244 930258963",
      password: "123456",
      nif: "0489LDN78B",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to register with same email twice", async () => {
    const email = "org@email.com";
    sut.execute({
      name_of_representative: "Fulano",
      email,
      address: "Vila de Viana ",
      phone: "+244 930258963",
      password: "123456",
      nif: "0489LDN78B",
    });

    await expect(
      sut.execute({
        name_of_representative: "Fulano",
        email,
        address: "Vila de Viana ",
        phone: "+244 930258963",
        password: "123456",
        nif: "0489LDN78B",
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });

  it("Should hash org password upon registration", async () => {
    const { org } = await sut.execute({
      name_of_representative: "fulano",
      email: "fulano@email.com",
      address: "Vila de Viana ",
      phone: "+244 930258963",
      password: "123456",
      nif: "0489LDN78B",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      org.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("Should not be able to registe without address", async () => {
    await expect(
      sut.execute({
        name_of_representative: "fulano",
        email: "fulano@email.com",
        address: "",
        phone: "+244 930258963",
        password: "123456",
        nif: "0489LDN78B",
      })
    ).rejects.toBeInstanceOf(InvalidAddress);
  });

  it("Should not be able to registe without phone number", async () => {
    await expect(
      sut.execute({
        name_of_representative: "fulano",
        email: "fulano@email.com",
        address: "Luanda",
        phone: "",
        password: "123456",
        nif: "0489LDN78B",
      })
    ).rejects.toBeInstanceOf(InvalidPhone);
  });
});
