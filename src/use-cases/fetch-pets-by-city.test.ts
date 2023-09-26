import { InMemoryPetsRepository } from "@/Repositories/in-memory/pets-respository";
import { it, describe, beforeEach, expect } from "vitest";
import { InMemoryOrgsRepository } from "@/Repositories/in-memory/orgs-repository";
import { hash } from "bcryptjs";
import { FetchPetsByCityUseCase } from "./fetch-pets-by-city";

let petsRepository: InMemoryPetsRepository;
let orgRepository: InMemoryOrgsRepository;
let sut: FetchPetsByCityUseCase;

describe("Fecth Pets Use Case", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    orgRepository = new InMemoryOrgsRepository();
    sut = new FetchPetsByCityUseCase(petsRepository);

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

  it("should be able to list pets by city", async () => {
    await petsRepository.create({
      org_id: "org-1",
      name: "picuto",
      about: "sweet",
      birth: new Date(),
      energy_level: "HIGH",
      level_of_independence: "LOW",
      city: "Luanda",
    });
    await petsRepository.create({
      org_id: "org-1",
      name: "Boby",
      about: "sweet",
      birth: new Date(),
      energy_level: "MEDIUM",
      level_of_independence: "HIGH",
      city: "Luanda",
    });

    await petsRepository.create({
      org_id: "org-1",
      name: "Mia",
      about: "sweet",
      birth: new Date(),
      energy_level: "MEDIUM",
      level_of_independence: "HIGH",
      city: "Benguela",
    });

    const city = "Luanda";

    const { pets } = await sut.execute({ city });

    expect(pets).toHaveLength(2);

    expect(pets).toEqual([
      expect.objectContaining({ name: "picuto" }),
      expect.objectContaining({ name: "Boby" }),
    ]);
  });
});
