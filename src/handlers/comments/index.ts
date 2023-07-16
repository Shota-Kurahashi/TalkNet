import { Prisma } from "@prisma/client";
import { prisma } from "src/libs/prisma";
import { CommentSchemaType } from "src/libs/schema/comment";

const commentsIncludeOption: Prisma.CommentInclude = {
  user: {
    include: {
      profile: true,
    },
  },
};

export const getComments = async (topicId: number) => {
  const comments = await prisma.comment.findMany({
    where: {
      topicId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: commentsIncludeOption,
  });

  return comments;
};

export const createComment = async (
  userId: number,
  { content, topicId }: CommentSchemaType
) => {
  const comment = await prisma.comment.create({
    data: {
      content,
      topicId,
      userId,
    },
    include: commentsIncludeOption,
  });

  return comment;
};
