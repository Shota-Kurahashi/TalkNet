/* eslint-disable consistent-return */
import { Prisma } from "@prisma/client";
import { NotFoundError } from "src/libs/error";
import { prisma, prismaErrorHandler } from "src/libs/prisma";
import { Topic } from "src/libs/schema/topic";

const topicIncludeOption: Prisma.TopicInclude = {
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
};

// eslint-disable-next-line consistent-return
export const getTopics = async (): Promise<Topic[]> => {
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

export const getTopic = async (id: number): Promise<Topic> => {
  try {
    const topic = await prisma.topic.findUnique({
      where: {
        id,
      },
      include: topicIncludeOption,
    });

    if (!topic) throw new NotFoundError();

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
