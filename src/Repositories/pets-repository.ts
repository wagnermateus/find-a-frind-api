import { PET, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PETUncheckedCreateInput): Promise<PET>;
  findById(id: string): Promise<PET | null>;
  findManyByCity(city: string): Promise<PET[]>;
}
