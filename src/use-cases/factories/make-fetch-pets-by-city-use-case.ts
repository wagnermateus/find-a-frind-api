import { PrismaPetsRepository } from "@/Repositories/prisma/prisma-pets-repository";
import { FetchPetsByCityUseCase } from "../fetch-pets-by-city";

export function MakeFetchPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const fetchPetsByCityUseCase = new FetchPetsByCityUseCase(petsRepository);

  return fetchPetsByCityUseCase;
}
