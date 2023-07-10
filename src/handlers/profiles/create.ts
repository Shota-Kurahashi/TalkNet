/* eslint-disable consistent-return */
import { prisma, prismaErrorHandler } from "src/libs/prisma";
import { ProfileSchema } from "src/libs/schema/profile";

export const createProfile = async (
  userId: number,
  { introduction, bio, cover_img }: ProfileSchema
) => {
  try {
    const profile = await prisma.profile.create({
      data: {
        introduction,
        bio,
        cover_img,
        userId,
      },
    });

    return profile;
  } catch (error) {
    prismaErrorHandler(error);
  }
};
