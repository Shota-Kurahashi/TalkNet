import { useMutation } from "@tanstack/react-query";
import { axios } from "src/libs/client";
import { TopicSchemaType, TopicsReturn } from "src/libs/schema/topic";

const postHandler = async (body: TopicSchemaType) => {
  console.log(body);
  const data = await axios
    .post<TopicsReturn>("/topics", {
      ...body,
    })
    .then((res) => res.data);

  return data;
};

export const useMutateTopic = () => {
  return useMutation({
    mutationFn: postHandler,
  });
};
