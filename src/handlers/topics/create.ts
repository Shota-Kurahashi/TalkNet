/* eslint-disable consistent-return */
import { prisma, prismaErrorHandler } from "src/libs/prisma";
import { TopicSchemaType } from "src/libs/schema/topic";

export const createTopic = async (
  userId: number,
  { content, title, image, moodId }: TopicSchemaType
) => {
  try {
    const topic = await prisma.topic.create({
      data: {
        content,
        title,
        image,
        userId,
        moodId,
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        comments: {
          include: {
            user: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    });

    return topic;
  } catch (error) {
    prismaErrorHandler(error);
  }
};
