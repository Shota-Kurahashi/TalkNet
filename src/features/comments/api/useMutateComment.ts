import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "src/libs/client";
import {
  CommentReturn,
  CommentSchemaType,
  CommentsReturn,
} from "src/libs/schema/comment";

const createComment = async (body: CommentSchemaType) => {
  const data = await axios
    .post<CommentReturn>(`/topics/${body.topicId}/comments`, body)
    .then((res) => res.data);

  return data;
};

export const useMutateComment = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      const prevData = queryClient.getQueryData<CommentsReturn>([
        "comments",
        { id },
      ]);

      if (!prevData?.comments) return;

      queryClient.invalidateQueries(["topics", { id }]);

      queryClient.setQueryData<CommentsReturn>(["comments", { id }], {
        comments: [data.comment, ...prevData.comments],
      });
    },
  });
};
