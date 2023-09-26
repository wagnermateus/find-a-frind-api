import { PetsRepository } from "@/Repositories/pets-repository";
import { PET } from "@prisma/client";

interface FetchPetsByCityUseCaseRequest {
  city: string;
}
interface FetchPetsByCityUseCaseResponse {
  pets: PET[];
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(city);

    return {
      pets,
    };
  }
}
