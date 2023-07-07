import { ProfileForm } from "src/components/form/profile";
import { useCreateProfile } from "src/features/profiles/hooks/useCreateProfile";

export const CreateProfile = () => {
  const { onValid } = useCreateProfile();

  return <ProfileForm onValid={onValid} type="create" />;
};
