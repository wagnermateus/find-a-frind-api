import { PET, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PETUncheckedCreateInput): Promise<PET>;
}
