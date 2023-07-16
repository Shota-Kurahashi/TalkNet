import { FC } from "react";
import { CommentForm } from "src/components/form/comment";
import { useCreateComments } from "src/features/comments/hooks/useCreateComments";

type Props = {
  topicId: number;
};

export const CreateComment: FC<Props> = ({ topicId }) => {
  const { onValid, isLoading } = useCreateComments(topicId);

  return <CommentForm isLoading={isLoading} onValid={onValid} />;
};
