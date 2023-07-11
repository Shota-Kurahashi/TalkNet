import React from "react";
import { ProfileForm } from "src/components/form/profile";
import { useEditProfile } from "src/features/profiles/hooks/useEditProfile";
import { ProfilePageProps } from "src/libs/next/page";

export const EditProfile = ({ profile }: ProfilePageProps) => {
  const { onValid } = useEditProfile();

  return (
    <ProfileForm
      defaultValues={profile ? { ...profile } : undefined}
      onValid={onValid}
      type="edit"
    />
  );
};
