import { useQuery } from "@tanstack/react-query";
import { axios } from "src/libs/client";
import { Topic, TopicsReturn } from "src/libs/schema/topic";

const getTopics = async () => {
  const data = await axios.get<TopicsReturn>("/topics").then((res) => res.data);

  return data;
};

export const useQueryTopics = (topics: Topic[]) => {
  return useQuery({
    queryKey: ["topics"],
    queryFn: getTopics,
    staleTime: 0,
    cacheTime: 0,
    initialData: {
      topics,
    },
  });
};
