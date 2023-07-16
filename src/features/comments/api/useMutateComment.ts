import { useMutation } from "@tanstack/react-query";
import { axios } from "src/libs/client";
import { CommentReturn, CommentSchemaType } from "src/libs/schema/comment";

const createComment = async (body: CommentSchemaType) => {
  const data = await axios
    .post<CommentReturn>("/comments", body)
    .then((res) => res.data);

  return data;
};

export const useMutateComment = () => {
  return useMutation({
    mutationFn: createComment,
  });
};
