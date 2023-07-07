import { SubmitHandler } from "react-hook-form";
import { ProfileSchema } from "src/libs/schema/profile";

export const useCreateProfile = () => {
  const onValid: SubmitHandler<ProfileSchema> = (data) => {
    console.log(data);
  };

  return {
    onValid,
  };
};
