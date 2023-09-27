import { PrismaPetsRepository } from "@/Repositories/prisma/prisma-pets-repository";
import { SearchPetsUseCase } from "../search-pets";

export function MakeSearchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const searchPetsUseCase = new SearchPetsUseCase(petsRepository);

  return searchPetsUseCase;
}
