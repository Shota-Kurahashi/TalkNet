import { Topic } from "@prisma/client";
import { z } from "zod";

export const topicSchema = z.object({
  title: z.string(),
  content: z.string(),
  image: z.string().optional(),
});

export type TopicSchemaType = z.infer<typeof topicSchema>;

export type TopicsReturn = {
  topics: Topic[];
};

export type TopicReturn = {
  topic: Topic;
};
