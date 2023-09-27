import { ResourceNotFoundError } from "@/use-cases/Errors/resource-not-found-error";
import { MakeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    birth: z.coerce.date(),
    energy_level: z.enum(["LOW", "MEDIUM", "HIGH"]),
    level_of_independence: z.enum(["LOW", "MEDIUM", "HIGH"]),
    org_id: z.string().uuid(),
    city: z.string(),
  });

  const {
    about,
    birth,
    city,
    energy_level,
    level_of_independence,
    name,
    org_id,
  } = createPetBodySchema.parse(request.body);

  try {
    const createPetUseCase = MakeCreatePetUseCase();

    await createPetUseCase.execute({
      about,
      birth,
      city,
      energy_level,
      level_of_independence,
      name,
      org_id,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send();
}
