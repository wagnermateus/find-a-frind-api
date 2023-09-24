import { OrgsRepository } from "@/Repositories/orgs-repository";
import { ORG } from "@prisma/client";
import { InvalidCredentialsError } from "./Errors/invalid-credencials-error";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}
interface AuthenticateUseCaseResponse {
  org: ORG;
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordsMatch = await compare(password, org.password_hash);

    if (!doesPasswordsMatch) {
      throw new InvalidCredentialsError();
    }
    return { org };
  }
}
