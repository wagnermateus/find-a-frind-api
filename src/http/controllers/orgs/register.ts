import { OrgAlreadyExistsError } from "@/use-cases/Errors/org-already-exists-error";
import { MakeRegisterOrgUseCase } from "@/use-cases/factories/make-register-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name_of_representative: z.string(),
    email: z.string().email(),
    address: z.string(),
    phone:
      z.string().regex(/^\+2449\d{8}$/) || z.string().regex(/^\+5511\d{8}$/),
    password: z.string().min(6),
    nif: z.string().length(14),
  });

  const { name_of_representative, address, email, nif, password, phone } =
    registerBodySchema.parse(request.body);

  try {
    const registerOrgsUseCase = MakeRegisterOrgUseCase();

    await registerOrgsUseCase.execute({
      name_of_representative,
      address,
      email,
      nif,
      password,
      phone,
    });
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send();
}
