import { MakeSearchPetsUseCase } from "@/use-cases/factories/make-search-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    energy_level: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    level_of_independence: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  });

  const { energy_level, level_of_independence } = searchPetsQuerySchema.parse(
    request.query
  );

  const searchPetsUseCase = MakeSearchPetsUseCase();

  const { pets } = await searchPetsUseCase.execute({
    energy_level,
    level_of_independence,
  });

  return reply.status(200).send({ pets });
}
