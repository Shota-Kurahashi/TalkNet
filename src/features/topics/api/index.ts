import { useQuery } from "@tanstack/react-query";
import { axios } from "src/libs/client";
import { TopicsReturn } from "src/libs/schema/topic";

const getTopics = async () => {
  const data = await axios.get<TopicsReturn>("/topics").then((res) => res.data);

  return data;
};

export const useQueryTopics = () => {
  return useQuery({
    queryKey: ["topics"],
    queryFn: getTopics,
  });
};
