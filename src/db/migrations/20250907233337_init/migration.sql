/*
  Warnings:

  - A unique constraint covering the columns `[repoId]` on the table `favorite_repository` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favorite_repository_repoId_key" ON "public"."favorite_repository"("repoId");
