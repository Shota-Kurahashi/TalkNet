import { CreateProfile } from "src/features/profiles/components/create";
import { EditProfile } from "src/features/profiles/components/edit";
import { useProfile } from "src/features/profiles/hooks/useProfile";

export const Profile = () => {
  const { type } = useProfile();

  return type === "create" ? (
    <CreateProfile />
  ) : type === "edit" ? (
    <EditProfile />
  ) : (
    <div>index</div>
  );
};
