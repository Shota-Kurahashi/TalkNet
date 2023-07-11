import { useRouter } from "next/router";
import { useNotificationState } from "src/components/elements/Notification/store";
import { useMutateAuth } from "src/features/auth/api/useMutateAuth";
import { LoginSchemaType } from "src/features/auth/types";

export const useLogin = () => {
  const { loginMutation } = useMutateAuth();
  const onNotification = useNotificationState((state) => state.onShow);
  const router = useRouter();

  const onValid = async (data: LoginSchemaType) => {
    try {
      await loginMutation.mutateAsync(data);

      router.push("/");
    } catch (error) {
      onNotification({
        title: "ログインに失敗しました",
        message: "メールアドレスまたはパスワードが間違っています",
        type: "error",
      });
    }
  };

  return {
    onValid,

    isLoading: loginMutation.isLoading,
    isError: loginMutation.isError,
  };
};
