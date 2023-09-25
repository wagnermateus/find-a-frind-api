/*
  Warnings:

  - The values [HiGH] on the enum `Energy` will be removed. If these variants are still used in the database, this will fail.
  - The values [HiGH] on the enum `Independence` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Energy_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "pets" ALTER COLUMN "energy_level" DROP DEFAULT;
ALTER TABLE "pets" ALTER COLUMN "energy_level" TYPE "Energy_new" USING ("energy_level"::text::"Energy_new");
ALTER TYPE "Energy" RENAME TO "Energy_old";
ALTER TYPE "Energy_new" RENAME TO "Energy";
DROP TYPE "Energy_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Independence_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "pets" ALTER COLUMN "level_of_independence" DROP DEFAULT;
ALTER TABLE "pets" ALTER COLUMN "level_of_independence" TYPE "Independence_new" USING ("level_of_independence"::text::"Independence_new");
ALTER TYPE "Independence" RENAME TO "Independence_old";
ALTER TYPE "Independence_new" RENAME TO "Independence";
DROP TYPE "Independence_old";
COMMIT;

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "energy_level" DROP DEFAULT,
ALTER COLUMN "level_of_independence" DROP DEFAULT;
