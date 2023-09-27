import { PrismaOrgsRepository } from "@/Repositories/prisma/prisma-orgs-repository";
import { AuthenticateUseCase } from "../authenticate";

export function MakeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const authenticateUseCase = new AuthenticateUseCase(orgsRepository);

  return authenticateUseCase;
}
