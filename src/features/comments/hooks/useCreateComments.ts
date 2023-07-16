import { SubmitHandler } from "react-hook-form";
import { useNotificationState } from "src/components/elements/Notification/store";
import { useMutateComment } from "src/features/comments/api/useMutateComment";
import { CommentInputSchemaType } from "src/libs/schema/comment";

export const useCreateComments = (topicId: number) => {
  const { mutateAsync, isLoading } = useMutateComment();
  const onNotification = useNotificationState((state) => state.onShow);

  const onValid: SubmitHandler<CommentInputSchemaType> = async (data) => {
    try {
      await mutateAsync({
        topicId,
        content: data.content,
      });
      onNotification({
        type: "success",
        title: "コメントを投稿しました",
      });
    } catch (error) {
      onNotification({
        type: "error",
        title: "コメントの投稿に失敗しました",
      });
    }
  };

  return {
    onValid,
    isLoading,
  };
};
