import { useRouter } from "next/router";
import React from "react";
import { useQueryTopic } from "src/features/topics/api/useQueryTopic";
import { Topic as CTopic } from "src/features/topics/components/topic";
import { NotFoundError } from "src/libs/error";
import { TopicPage } from "src/libs/next/page";

export const Topic = ({ data }: TopicPage) => {
  const router = useRouter();
  const { data: result } = useQueryTopic({
    id: Number(router.query.id),
    topic: data?.topic,
  });

  if (!result.topic) throw new NotFoundError();

  return <CTopic topic={result.topic} />;
};
