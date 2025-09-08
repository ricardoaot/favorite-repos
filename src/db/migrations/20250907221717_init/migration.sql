/*
  Warnings:

  - You are about to drop the `Item3` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Item3";

-- CreateTable
CREATE TABLE "public"."favorite_repository" (
    "id" SERIAL NOT NULL,
    "repoId" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorite_repository_pkey" PRIMARY KEY ("id")
);
