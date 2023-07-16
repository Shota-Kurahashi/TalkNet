import React, { FC } from "react";
import { Comment } from "src/features/comments/components/comment";
import { Comment as TComment } from "src/libs/schema/comment";

type Props = {
  data: TComment[];
};

export const Comments: FC<Props> = ({ data }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {data?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  );
};
