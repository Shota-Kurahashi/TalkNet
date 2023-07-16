/* eslint-disable consistent-return */
import { prisma, prismaErrorHandler } from "src/libs/prisma";

export const getProfile = async (userId: number) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) return null;

    return profile;
  } catch (error) {
    prismaErrorHandler(error);
  }
};
