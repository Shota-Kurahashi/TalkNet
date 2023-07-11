import { useRouter } from "next/router";
import { useNotificationState } from "src/components/elements/Notification/store";
import { useMutateAuth } from "src/features/auth/api/useMutateAuth";
import { SignUpSchemaType } from "src/features/auth/types";

export const useSignUp = () => {
  const { signUpMutation } = useMutateAuth();
  const onNotification = useNotificationState((state) => state.onShow);
  const router = useRouter();
  const onValid = async (data: SignUpSchemaType) => {
    try {
      const { user_id } = await signUpMutation.mutateAsync(data);

      onNotification({
        title: "新規登録しました。",
        type: "success",
      });

      router.push(`/profiles/${user_id}?type=create`);
    } catch (error) {
      onNotification({
        title: "新規登録に失敗しました。",
        message: "メールアドレスまたはパスワードが間違っています。",
        type: "error",
      });
    }
  };

  return {
    onValid,
    isLoading: signUpMutation.isLoading,
    isError: signUpMutation.isError,
  };
};
