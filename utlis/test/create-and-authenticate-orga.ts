import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import request from "supertest";
import { FastifyInstance } from "fastify";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const { id } = await prisma.oRG.create({
    data: {
      name_of_representative: "John  Doe",
      address: "Luanda, Talatona",
      email: "john@example.com",
      nif: "123456789LNIUY",
      password_hash: await hash("123456", 6),
      phone: "+244925478965",
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "john@example.com",
    password: "123456",
  });

  const { token } = await authResponse.body;
  return {
    token,
    orgId: id,
  };
}
