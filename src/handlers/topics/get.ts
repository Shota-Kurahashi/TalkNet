/* eslint-disable consistent-return */
import { Prisma } from "@prisma/client";
import { prisma, prismaErrorHandler } from "src/libs/prisma";

const topicIncludeOption: Prisma.TopicInclude = {
  user: {
    select: {
      name: true,
      id: true,
      profile: {
        select: {
          bio: true,
        },
      },
    },
  },
  comments: true,
};

// eslint-disable-next-line consistent-return
export const getTopics = async () => {
  try {
    const topics = await prisma.topic.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: topicIncludeOption,
    });

    return topics;
  } catch (error) {
    prismaErrorHandler(error);
  }
};

export const getTopic = async (id: number) => {
  try {
    const topic = await prisma.topic.findUnique({
      where: {
        id,
      },
      include: topicIncludeOption,
    });

    return topic;
  } catch (error) {
    prismaErrorHandler(error);
  }
};

export const getTopicsByUserId = async (userId: number) => {
  try {
    const topics = await prisma.topic.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: topicIncludeOption,
    });

    return topics;
  } catch (error) {
    prismaErrorHandler(error);
  }
};
