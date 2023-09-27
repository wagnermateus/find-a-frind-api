import { InMemoryPetsRepository } from "@/Repositories/in-memory/in-memory-pets-respository";
import { it, describe, beforeEach, expect } from "vitest";
import { InMemoryOrgsRepository } from "@/Repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
import { SearchPetsUseCase } from "./search-pets";

let petsRepository: InMemoryPetsRepository;
let orgRepository: InMemoryOrgsRepository;
let sut: SearchPetsUseCase;
describe("Search Pets Use Case", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    orgRepository = new InMemoryOrgsRepository();
    sut = new SearchPetsUseCase(petsRepository);

    const password = await hash("123456", 6);

    await orgRepository.create({
      id: "org-1",
      name_of_representative: "Wagner",
      email: "orgr@email.com",
      address: "Vila de Viana ",
      phone: "+244 930258963",
      password_hash: password,
      nif: "0489LDN78B",
    });

    await petsRepository.create({
      id: "pet-1",
      org_id: "org-1",
      name: "picuto",
      about: "sweet",
      birth: new Date("2020-10-26"),
      energy_level: "HIGH",
      level_of_independence: "LOW",
      city: "Luanda",
    });

    await petsRepository.create({
      id: "pet-2",
      org_id: "org-1",
      name: "puppy",
      about: "sweet",
      birth: new Date("2018-02-25"),
      energy_level: "HIGH",
      level_of_independence: "LOW",
      city: "Benguela",
    });

    await petsRepository.create({
      id: "pet-2",
      org_id: "org-1",
      name: "puppy",
      about: "sweet",
      birth: new Date("2020-10-26"),
      energy_level: "LOW",
      level_of_independence: "LOW",
      city: "Benguela",
    });
  });

  it("should be able to find pets", async () => {
    const { pets } = await sut.execute({
      energy_level: "HIGH",
      level_of_independence: "LOW",
    });

    expect(pets).toHaveLength(2);

    expect(pets).toEqual([
      expect.objectContaining({ name: "picuto" }),
      expect.objectContaining({ name: "puppy" }),
    ]);
  });

  it("should be able to find pets with optional filters", async () => {
    const { pets } = await sut.execute({
      energy_level: undefined,
      level_of_independence: "LOW",
    });

    expect(pets).toHaveLength(3);
  });
});
