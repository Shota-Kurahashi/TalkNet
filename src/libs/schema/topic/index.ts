import { Comment, Topic as PTopic, Profile, User } from "@prisma/client";
import { z } from "zod";

export const topicSchema = z.object({
  title: z.string().min(1, {
    message: "タイトルを入力してください。",
  }),
  content: z
    .string({
      required_error: "本文を入力してください。",
    })
    .min(1, {
      message: "本文を入力してください。",
    }),
  image: z.string().nullable().optional(),
  moodId: z.number({
    required_error: "気分を選択してください。",
  }),
});

export type TopicSchemaType = z.infer<typeof topicSchema>;

export type Topic =
  | PTopic & {
      user?: Pick<User, "id" | "name"> & {
        profile?: Pick<Profile, "bio">;
      };
      comments?: (Comment & {
        user?: Pick<User, "id" | "name"> & {
          profile?: Pick<Profile, "bio">;
        };
      })[];
    };

export type TopicsReturn = {
  topics: Topic[];
};

export type TopicReturn = {
  topic: Topic;
};
