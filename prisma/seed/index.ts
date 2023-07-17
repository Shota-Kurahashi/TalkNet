import { PrismaClient } from "@prisma/client";
import { generateMoods } from "./moods";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$transaction([...generateMoods()]);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
