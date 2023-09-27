import { PrismaOrgsRepository } from "@/Repositories/prisma/prisma-orgs-repository";
import { RegisteOrgUseCase } from "../register-org";

export function MakeRegisterOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const registerOrgUseCase = new RegisteOrgUseCase(orgsRepository);

  return registerOrgUseCase;
}
