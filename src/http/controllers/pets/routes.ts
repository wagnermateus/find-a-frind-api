import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJwt } from "@/http/middlewares/werify-jwt";
import { fetchByCity } from "./fetchByCity";

export async function petsRoutes(app: FastifyInstance) {
  app.get("/pets/:city", fetchByCity);

  /** Authenticated */
  app.post("/pets", { onRequest: [verifyJwt] }, create);
}
