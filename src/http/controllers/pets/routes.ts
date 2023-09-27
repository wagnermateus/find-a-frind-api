import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJwt } from "@/http/middlewares/werify-jwt";

export async function petsRoutes(app: FastifyInstance) {
  /** Authenticated */
  app.post("/pets", { onRequest: [verifyJwt] }, create);
}
