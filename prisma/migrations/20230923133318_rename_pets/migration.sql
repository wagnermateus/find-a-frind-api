/*
  Warnings:

  - You are about to drop the `Pet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_org_Id_fkey";

-- DropTable
DROP TABLE "Pet";

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,
    "energy_level" "Energy" NOT NULL,
    "level_of_independence" "Independence" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "org_Id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_Id_fkey" FOREIGN KEY ("org_Id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
