import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { useNotificationState } from "src/components/elements/Notification/store";
import { useMutateProfile } from "src/features/profiles/api/useMutateProfile";
import { ProfileSchema } from "src/libs/schema/profile";

export const useCreateProfile = () => {
  const { createProfile } = useMutateProfile();
  const onNotification = useNotificationState((state) => state.onShow);
  const router = useRouter();

  const onValid: SubmitHandler<ProfileSchema> = async (data) => {
    try {
      await createProfile.mutateAsync(data);
      onNotification({
        title: "プロフィールを作成しました",
        type: "success",
      });

      router.push("/");
    } catch (error) {
      onNotification({
        title: "プロフィールの作成に失敗しました",
        type: "error",
      });
    }
  };

  return {
    onValid,
  };
};
