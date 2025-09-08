import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.item.createMany({
    data: [
      { name: "Item 1" },
      { name: "Item 2" },
      { name: "Item 3" },
    ],
  });
}

main()
  .then(() => console.log("Seed completed"))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());