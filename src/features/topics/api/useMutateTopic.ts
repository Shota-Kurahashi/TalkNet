import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "src/libs/client";
import {
  TopicReturn,
  TopicSchemaType,
  TopicsReturn,
} from "src/libs/schema/topic";

const postHandler = async (body: TopicSchemaType) => {
  const data = await axios
    .post<TopicReturn>("/topics", {
      ...body,
    })
    .then((res) => res.data);

  return data;
};

export const useMutateTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postHandler,
    onSuccess: (data) => {
      const { topic } = data;
      const prevData = queryClient.getQueryData<TopicsReturn>(["topics"]);

      if (!prevData) return;

      queryClient.setQueryData<TopicsReturn>(["topics"], {
        topics: [topic, ...prevData.topics],
      });
    },
  });
};
