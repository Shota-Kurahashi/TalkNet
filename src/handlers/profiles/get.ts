/* eslint-disable consistent-return */
import { NotFoundError } from "src/libs/error";
import { prisma, prismaErrorHandler } from "src/libs/prisma";

export const getProfile = async (userId: number) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) throw new NotFoundError();

    return profile;
  } catch (error) {
    prismaErrorHandler(error);
  }
};
