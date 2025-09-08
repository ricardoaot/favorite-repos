/*
  Warnings:

  - Added the required column `appUserId` to the `favorite_repository` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."favorite_repository" ADD COLUMN     "appUserId" TEXT NOT NULL;
