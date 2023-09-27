import { ORG, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: ORG[] = [];

  async create(data: Prisma.ORGCreateInput) {
    const org = {
      id: data.id ? data.id : randomUUID(),
      name_of_representative: data.name_of_representative,
      email: data.email,
      address: data.address,
      phone: data.phone,
      password_hash: data.password_hash,
      nif: data.nif,
      created_at: new Date(),
    };

    this.items.push(org);
    return org;
  }
  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);

    if (!org) {
      return null;
    }

    return org;
  }
  async findById(id: string) {
    const org = this.items.find((item) => item.id === id);

    if (!org) {
      return null;
    }

    return org;
  }
}
