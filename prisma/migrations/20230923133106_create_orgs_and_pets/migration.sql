-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('LOW', 'MEDIUM', 'HiGN');

-- CreateEnum
CREATE TYPE "Independence" AS ENUM ('LOW', 'MEDIUM', 'HiGN');

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name_of_representative" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,
    "energy_level" "Energy" NOT NULL,
    "level_of_independence" "Independence" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "org_Id" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_phone_key" ON "orgs"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_nif_key" ON "orgs"("nif");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_org_Id_fkey" FOREIGN KEY ("org_Id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
