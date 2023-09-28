import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJwt } from "@/http/middlewares/werify-jwt";
import { fetchByCity } from "./fetchByCity";
import { search } from "./search";

export async function petsRoutes(app: FastifyInstance) {
  app.get("/pets/:city", fetchByCity);
  app.get("/pets/search", search);
  /** Authenticated */
  app.post("/pets", { onRequest: [verifyJwt] }, create);
}
