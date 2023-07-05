import { useRouter } from "next/router";
import { useNotificationState } from "src/components/elements/Notification/store";
import { useMutateAuth } from "src/features/auth/api/useMutateAuth";

export const useLogout = () => {
  const { logoutMutation } = useMutateAuth();
  const router = useRouter();
  const onNotification = useNotificationState((state) => state.onShow);

  const onClickHandler = async () => {
    try {
      await logoutMutation.mutateAsync();

      onNotification({
        title: "ログアウトしました。",
        type: "success",
      });

      router.push("/login");
    } catch (error) {
      onNotification({
        title: "ログアウトに失敗しました。",
        message: "再度お試しください。",
        type: "error",
      });
    }
  };

  return {
    onClickHandler,
  };
};
