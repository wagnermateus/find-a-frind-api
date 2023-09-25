import { InMemoryPetsRepository } from "@/Repositories/in-memory/pets-respository";
import { it, describe, beforeEach, expect } from "vitest";
import { GetPetUseCase } from "./get-pet";
import { InMemoryOrgsRepository } from "@/Repositories/in-memory/orgs-repository";
import { hash } from "bcryptjs";

let petsRepository: InMemoryPetsRepository;
let orgRepository: InMemoryOrgsRepository;
let sut: GetPetUseCase;
describe("Get Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    orgRepository = new InMemoryOrgsRepository();
    sut = new GetPetUseCase(petsRepository);
  });

  it("should be able to return a pet", async () => {
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
      birth: new Date(),
      energy_level: "HIGH",
      level_of_independence: "LOW",
    });
    const { pet } = await sut.execute({
      pet_id: "pet-1",
    });

    expect(pet.name).toEqual("picuto");
    expect(pet.id).toEqual("pet-1");
  });
});
