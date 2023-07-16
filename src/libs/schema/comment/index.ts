import { Comment as PComment, Profile } from "@prisma/client";
import { z } from "zod";
import { User } from "src/libs/schema/user";

export const commentInputSchema = z.object({
  content: z.string().min(1, {
    message: "コメントを入力してください",
  }),
});

export type CommentInputSchemaType = z.infer<typeof commentInputSchema>;

export const commentSchema = z.object({
  topicId: z.number(),
  content: z.string(),
});

export type CommentSchemaType = z.infer<typeof commentSchema>;
export type Comment = PComment & {
  user?: Pick<User, "id" | "name"> & {
    profile?: Pick<Profile, "bio">;
  };
};

export type CommentsReturn = {
  comments: Comment[];
};

export type CommentReturn = {
  comment: Comment;
};
