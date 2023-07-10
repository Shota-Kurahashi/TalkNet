import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ProfileReturn, ProfileSchema } from "src/libs/schema/profile";

const updateProfileHandler = async (profile: ProfileSchema) => {
  const data = await axios
    .put<ProfileReturn>("/api/profiles", profile)
    .then((res) => res.data);

  return data;
};

const createProfileHandler = async (profile: ProfileSchema) => {
  const data = await axios
    .post<ProfileReturn>("/api/profiles", profile)
    .then((res) => res.data);

  return data;
};

export const useMutateProfile = () => {
  const updateProfile = useMutation(updateProfileHandler);
  const createProfile = useMutation(createProfileHandler);

  return {
    updateProfile,
    createProfile,
  };
};
