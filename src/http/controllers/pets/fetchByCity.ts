import { CityNotFoundError } from "@/use-cases/Errors/city-not-found-error";
import { MakeFetchPetsByCityUseCase } from "@/use-cases/factories/make-fetch-pets-by-city-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchByCity(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchPetsByCityParamsSchema = z.object({
    city: z.string(),
  });

  const { city } = fetchPetsByCityParamsSchema.parse(request.params);

  try {
    const fetchPetsByCityUseCase = MakeFetchPetsByCityUseCase();

    const { pets } = await fetchPetsByCityUseCase.execute({
      city,
    });

    reply.status(200).send({ pets });
  } catch (error) {
    if (error instanceof CityNotFoundError) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
