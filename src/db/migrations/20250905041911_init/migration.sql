-- CreateTable
CREATE TABLE "public"."Item2" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item2_pkey" PRIMARY KEY ("id")
);
