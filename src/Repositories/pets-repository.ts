import { PET, Prisma } from "@prisma/client";

export type SearchManyParams = {
  energy_level?: "LOW" | "MEDIUM" | "HIGH";
  level_of_independence?: "LOW" | "MEDIUM" | "HIGH";
};
export interface PetsRepository {
  create(data: Prisma.PETUncheckedCreateInput): Promise<PET>;
  findById(id: string): Promise<PET | null>;
  findManyByCity(city: string): Promise<PET[]>;
  searchMany({
    energy_level,
    level_of_independence,
  }: SearchManyParams): Promise<PET[]>;
}
