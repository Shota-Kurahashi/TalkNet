import { useQuery } from "@tanstack/react-query";
import { axios } from "src/libs/client";
import { Comment, CommentsReturn } from "src/libs/schema/comment";

const getComment = async (id: number) => {
  const data = await axios
    .get<CommentsReturn>(`/topics/${id}/comments`)
    .then((res) => res.data);

  return data;
};

type Props = {
  id: number;
  comments: Comment[];
};

export const useQueryComment = ({ id, comments }: Props) => {
  return useQuery({
    queryKey: ["comments", { id }],
    queryFn: () => getComment(id),

    initialData: {
      comments,
    },
  });
};
