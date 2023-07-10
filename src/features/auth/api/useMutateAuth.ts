import { useMutation } from "@tanstack/react-query";

import { LoginSchemaType, SignUpSchemaType } from "src/features/auth/types";
import { axios } from "src/libs/client";
import { LoginResult } from "src/pages/api/auth/login";

const loginHandler = async (data: LoginSchemaType) => {
  const res = await axios.post<LoginResult>("/auth/login", data);

  return res.data;
};

const signUpHandler = async (data: SignUpSchemaType) => {
  const body: Omit<SignUpSchemaType, "confirmPassword"> = {
    email: data.email,
    password: data.password,
    name: data.name,
  };

  const res = await axios.post("/auth/signup", body);

  return res.data;
};

const logoutHandler = async () => {
  const res = await axios.post<{
    message: string;
  }>("/auth/logout");

  return res.data;
};

export const useMutateAuth = () => {
  const loginMutation = useMutation(loginHandler);

  const signUpMutation = useMutation(signUpHandler);

  const logoutMutation = useMutation(logoutHandler);

  return {
    loginMutation,
    signUpMutation,
    logoutMutation,
  };
};
