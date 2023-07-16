/* eslint-disable consistent-return */
import { NotFoundError } from "src/libs/error";
import { prisma, prismaErrorHandler } from "src/libs/prisma";

export const getUser = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        topics: true,
      },
    });

    if (!user) throw new NotFoundError();

    return user;
  } catch (error) {
    prismaErrorHandler(error);
  }
};
