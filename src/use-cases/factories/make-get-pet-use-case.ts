import { PrismaPetsRepository } from "@/Repositories/prisma/prisma-pets-repository";
import { GetPetUseCase } from "../get-pet";

export function MakeGetPetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const getPetUseCase = new GetPetUseCase(petsRepository);

  return getPetUseCase;
}
