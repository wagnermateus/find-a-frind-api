import { PetsRepository } from "@/Repositories/pets-repository";
import { PET } from "@prisma/client";
import { ResourceNotFoundError } from "./Errors/resource-not-found-error";

interface GetPetUseCaseRequest {
  pet_id: string;
}
interface GetPetUseCaseResponse {
  pet: PET;
}
export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    pet_id,
  }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(pet_id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return { pet };
  }
}
