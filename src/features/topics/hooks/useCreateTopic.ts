import { SubmitHandler } from "react-hook-form";
import { useNotificationState } from "src/components/elements/Notification/store";
import { useMutateTopic } from "src/features/topics/api/useMutateTopic";
import { TopicSchemaType } from "src/libs/schema/topic";

export const useCreateTopic = () => {
  const { mutateAsync, isLoading } = useMutateTopic();
  const onNotification = useNotificationState((state) => state.onShow);

  const onValid: SubmitHandler<TopicSchemaType> = async (data) => {
    try {
      await mutateAsync(data);
      onNotification({
        title: "トピックを作成しました",
        type: "success",
      });
    } catch (error) {
      onNotification({
        title: "トピックの作成に失敗しました",
        type: "error",
      });
    }
  };

  return {
    onValid,
    isLoading,
  };
};
