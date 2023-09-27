import { PetsRepository } from "@/Repositories/pets-repository";
import { PET } from "@prisma/client";

interface SearchPetsUseCaseRequest {
  energy_level?: "LOW" | "MEDIUM" | "HIGH";
  level_of_independence?: "LOW" | "MEDIUM" | "HIGH";
}
interface SearchPetsUseCaseResponse {
  pets: PET[];
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    energy_level,
    level_of_independence,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany({
      energy_level,
      level_of_independence,
    });

    return { pets };
  }
}
