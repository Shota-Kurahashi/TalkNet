/* eslint-disable consistent-return */
import { prisma, prismaErrorHandler } from "src/libs/prisma";
import { ProfileSchema } from "src/libs/schema/profile";

export const updateProfile = async (
  userId: number,
  { introduction, bio, cover_img }: ProfileSchema
) => {
  try {
    const profile = await prisma.profile.update({
      where: {
        userId,
      },
      data: {
        introduction,
        bio,
        cover_img,
      },
    });

    return profile;
  } catch (error) {
    prismaErrorHandler(error);
  }
};
