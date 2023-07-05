import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LoginSchemaType, SignUpSchemaType } from "src/features/auth/types";

const loginHandler = async (data: LoginSchemaType) => {
  const res = await axios.post("/api/auth/login", data);

  return res.data;
};

const signUpHandler = async (data: SignUpSchemaType) => {
  const res = await axios.post("/api/auth/signup", data);

  return res.data;
};

export const useMutateAuth = () => {
  const loginMutation = useMutation(loginHandler);

  const signUpMutation = useMutation(signUpHandler);

  return {
    loginMutation,
    signUpMutation,
  };
};
