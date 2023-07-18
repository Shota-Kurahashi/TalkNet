import { BadRequestError, NotFoundError } from "src/libs/error";
import { prisma, prismaErrorHandler } from "src/libs/prisma";
import { Topic } from "src/libs/schema/topic";

// eslint-disable-next-line consistent-return
export const searchTopics = async (title: string): Promise<Topic[]> => {
  if (!title) throw new BadRequestError();

  try {
    const topics = await prisma.topic.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });

    if (!topics) throw new NotFoundError();

    return topics;
  } catch (error) {
    prismaErrorHandler(error);
  }
};
