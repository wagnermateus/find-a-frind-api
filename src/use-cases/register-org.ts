import { OrgsRepository } from "@/Repositories/orgs-repository";
import { ORG } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "@/use-cases/Errors/org-already-exists-error";
import { InvalidAddress } from "./Errors/invalid-address-error";
import { InvalidPhone } from "./Errors/invalid-phone-error";

interface RegisteOrgUseCaseRequest {
  name_of_representative: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  nif: string;
}

interface RegisteOrgUseCaseResponse {
  org: ORG;
}

export class RegisteOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    name_of_representative,
    email,
    address,
    phone,
    password,
    nif,
  }: RegisteOrgUseCaseRequest): Promise<RegisteOrgUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.orgRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    if (address.trim().length === 0) {
      throw new InvalidAddress();
    }

    if (phone.trim().length === 0) {
      throw new InvalidPhone();
    }

    const org = await this.orgRepository.create({
      name_of_representative,
      email,
      address,
      phone,
      password_hash,
      nif,
    });

    return { org };
  }
}
