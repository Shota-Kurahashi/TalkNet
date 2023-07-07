import { useRouter } from "next/router";

export const useProfile = () => {
  const router = useRouter();

  const { type } = router.query;

  return {
    type,
  };
};
