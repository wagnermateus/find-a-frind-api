import { InMemoryPetsRepository } from "@/Repositories/in-memory/in-memory-pets-respository";
import { it, describe, beforeEach, expect } from "vitest";
import { CreatePetUseCase } from "./create-pet";
import { InMemoryOrgsRepository } from "@/Repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./Errors/resource-not-found-error";

let petsRepository: InMemoryPetsRepository;
let orgRepository: InMemoryOrgsRepository;
let sut: CreatePetUseCase;

describe("CreatePetUseCase", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    orgRepository = new InMemoryOrgsRepository();
    sut = new CreatePetUseCase(petsRepository, orgRepository);

    const password = await hash("123456", 6);

    await orgRepository.create({
      id: "org-1",
      name_of_representative: "Wagner",
      email: "org@email.com",
      address: "Vila de Viana ",
      phone: "+244 930258963",
      password_hash: password,
      nif: "0489LDN78B",
    });
  });

  it("should to create a pet", async () => {
    const { pet } = await sut.execute({
      org_id: "org-1",
      name: "picuto",
      about: "sweet",
      birth: new Date(),
      energy_level: "HIGH",
      level_of_independence: "LOW",
      city: "Luanda",
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("should not be able to create a pet with non-existent organization ID", async () => {
    await expect(
      sut.execute({
        org_id: "org-2",
        name: "picuto",
        about: "sweet",
        birth: new Date(),
        energy_level: "HIGH",
        level_of_independence: "LOW",
        city: "Luanda",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
