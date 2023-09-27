import { Prisma, $Enums } from "@prisma/client";
import { PetsRepository, SearchManyParams } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PETUncheckedCreateInput) {
    const pet = await prisma.pET.create({
      data,
    });

    return pet;
  }
  async findById(id: string) {
    const pet = await prisma.pET.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }
  async findManyByCity(city: string) {
    const pets = await prisma.pET.findMany({
      where: {
        city,
      },
    });
    return pets;
  }
  async searchMany({ energy_level, level_of_independence }: SearchManyParams) {
    const pets = await prisma.pET.findMany({
      where: {
        energy_level,
        level_of_independence,
      },
    });

    return pets;
  }
}
