import { OrgsRepository } from "@/Repositories/orgs-repository";
import { PetsRepository } from "@/Repositories/pets-repository";
import { PET } from "@prisma/client";
import { ResourceNotFoundError } from "./Errors/resource-not-found-error";

interface CreatePetUseCaseRequest {
  name: string;
  about: string;
  birth: Date;
  energy_level: "LOW" | "MEDIUM" | "HIGH";
  level_of_independence: "LOW" | "MEDIUM" | "HIGH";
  org_id: string;
  city: string;
}
interface CreatePetUseCaseResponse {
  pet: PET;
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRespository: OrgsRepository
  ) {}

  async execute({
    name,
    about,
    birth,
    energy_level,
    level_of_independence,
    org_id,
    city,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRespository.findById(org_id);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      birth,
      energy_level,
      level_of_independence,
      org_id,
      city,
    });

    return { pet };
  }
}
