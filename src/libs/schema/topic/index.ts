import { Topic } from "@prisma/client";
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
  image: z.string().nullable(),
  moodId: z.number({
    required_error: "気分を選択してください。",
  }),
});

export type TopicSchemaType = z.infer<typeof topicSchema>;

export type TopicsReturn = {
  topics: Topic[];
};

export type TopicReturn = {
  topic: Topic;
};
