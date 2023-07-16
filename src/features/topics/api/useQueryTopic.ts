import { useQuery } from "@tanstack/react-query";
import { axios } from "src/libs/client";
import { Topic, TopicReturn } from "src/libs/schema/topic";

const getTopic = async (id: number) => {
  const data = await axios
    .get<TopicReturn>(`/topics/${id}`)
    .then((res) => res.data);

  return data;
};

type Props = {
  topic: Topic | null;
  id: number;
};

export const useQueryTopic = ({ topic, id }: Props) => {
  return useQuery({
    queryKey: ["topic", id],
    queryFn: () => getTopic(id),
    initialData: {
      topic,
    },
  });
};
