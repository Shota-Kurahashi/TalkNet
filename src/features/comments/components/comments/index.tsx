import React, { FC } from "react";
import { useQueryComment } from "src/features/comments/api/useQueryComment";
import { Comment } from "src/features/comments/components/comment";
import { Comment as TComment } from "src/libs/schema/comment";

type Props = {
  comments: TComment[];
  id: number;
};

export const Comments: FC<Props> = ({ comments, id }) => {
  const { data } = useQueryComment({
    comments,
    id,
  });

  return (
    <ul className="divide-y divide-gray-200">
      {data.comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  );
};
