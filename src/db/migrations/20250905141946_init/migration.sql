-- CreateTable
CREATE TABLE "public"."Item3" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item3_pkey" PRIMARY KEY ("id")
);
