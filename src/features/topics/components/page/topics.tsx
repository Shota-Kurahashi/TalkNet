import { FC } from "react";
import { useQueryTopics } from "src/features/topics/api/useQueryTopics";
import { Topic } from "src/features/topics/components/topic";
import { TopPageProps } from "src/libs/next/page";

type Props = {
  topics: TopPageProps["topics"];
};

export const Topics: FC<Props> = ({ topics }) => {
  const { data } = useQueryTopics(topics);

  return (
    <ul className="divide-y divide-gray-300">
      {data.topics?.map((topic) => (
        <Topic key={topic.id} topic={topic} />
      ))}
    </ul>
  );
};
