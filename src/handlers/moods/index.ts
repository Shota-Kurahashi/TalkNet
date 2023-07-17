import { NotFoundError } from "src/libs/error";
import { prisma, prismaErrorHandler } from "src/libs/prisma";

// eslint-disable-next-line consistent-return
export const getMoods = async () => {
  try {
    // 最大で上から7件取得
    const moods = await prisma.mood.findMany({
      take: 7,
    });

    if (!moods) throw new NotFoundError();

    return moods.slice(0, 7);
  } catch (error) {
    prismaErrorHandler(error);
  }
};
