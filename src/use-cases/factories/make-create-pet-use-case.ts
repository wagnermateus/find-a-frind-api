import { PrismaOrgsRepository } from "@/Repositories/prisma/prisma-orgs-repository";
import { CreatePetUseCase } from "../create-pet";
import { PrismaPetsRepository } from "@/Repositories/prisma/prisma-pets-repository";

export function MakeCreatePetUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository();
  const createPetUseCase = new CreatePetUseCase(petsRepository, orgsRepository);

  return createPetUseCase;
}
