import { NotFoundError } from "src/libs/error";
import { prisma, prismaErrorHandler } from "src/libs/prisma";

// eslint-disable-next-line consistent-return
export const getMoods = async () => {
  try {
    const moods = await prisma.mood.findMany();

    if (!moods) throw new NotFoundError();

    return moods;
  } catch (error) {
    prismaErrorHandler(error);
  }
};
