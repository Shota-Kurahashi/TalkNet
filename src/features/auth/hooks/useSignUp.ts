import { useRouter } from "next/router";
import { useNotificationState } from "src/components/elements/Notification/store";
import { useMutateAuth } from "src/features/auth/api/useMutateLogin";
import { SignUpSchemaType } from "src/features/auth/types";

export const useSignUp = () => {
  const { signUpMutation } = useMutateAuth();
  const onNotification = useNotificationState((state) => state.onShow);
  const router = useRouter();
  const onValid = async (data: SignUpSchemaType) => {
    try {
      await signUpMutation.mutateAsync(data);

      router.push("/");
    } catch (error) {
      onNotification({
        title: "新規登録に失敗しました。",
        message: "メールアドレスまたはパスワードが間違っています。",
        type: "error",
      });
    }
  };

  const onInvalid = () => {
    console.log("inValid");
  };

  return {
    onValid,
    onInvalid,
    isLoading: signUpMutation.isLoading,
    isError: signUpMutation.isError,
  };
};
