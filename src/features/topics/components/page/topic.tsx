import { useRouter } from "next/router";
import React from "react";
import { useQueryComment } from "src/features/comments/api/useQueryComment";
import { Comments } from "src/features/comments/components/comments";
import { CreateComment } from "src/features/comments/components/create";
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

  const { data: commentsData } = useQueryComment({
    comments: result.topic?.comments ?? [],
    id: Number(router.query.id),
  });

  if (!result.topic) throw new NotFoundError();

  return (
    <div className="flex flex-col gap-y-10">
      <CTopic isSlug topic={result.topic} />
      <CreateComment topicId={Number(router.query.id)} />
      {result.topic.comments?.length ? (
        <Comments data={commentsData?.comments} />
      ) : null}
    </div>
  );
};
