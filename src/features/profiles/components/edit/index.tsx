import React from "react";
import { ProfileForm } from "src/components/form/profile";
import { useEditProfile } from "src/features/profiles/hooks/useEditProfile";
import { ProfilePageProps } from "src/libs/next/page";

export const EditProfile = ({ profile }: ProfilePageProps) => {
  const { onValid } = useEditProfile();

  return (
    <ProfileForm
      defaultValues={{
        bio: profile.bio,
        cover_img: profile.cover_img,
        introduction: profile.introduction,
      }}
      onValid={onValid}
      type="edit"
    />
  );
};
