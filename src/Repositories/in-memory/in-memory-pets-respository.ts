import { Prisma, PET } from "@prisma/client";
import { PetsRepository, SearchManyParams } from "../pets-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: PET[] = [];

  async create(data: Prisma.PETUncheckedCreateInput) {
    const pet = {
      id: data.id ? data.id : randomUUID(),
      name: data.name,
      about: data.about,
      birth: new Date(data.birth),
      energy_level: data.energy_level,
      level_of_independence: data.level_of_independence,
      org_id: data.org_id,
      city: data.city,
      created_at: new Date(),
    };

    this.items.push(pet);
    return pet;
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async findManyByCity(city: string) {
    const pets = this.items.filter((pet) => pet.city === city);

    return pets;
  }

  async searchMany({ energy_level, level_of_independence }: SearchManyParams) {
    if (energy_level !== undefined && level_of_independence !== undefined) {
      return this.items.filter(
        (item) =>
          item.energy_level === energy_level &&
          item.level_of_independence === level_of_independence
      );
    } else if (
      energy_level !== undefined &&
      level_of_independence === undefined
    ) {
      return this.items.filter((item) => item.energy_level === energy_level);
    } else {
      return this.items.filter(
        (item) => item.level_of_independence === level_of_independence
      );
    }
  }
}
