import React from "react";
import { CreateTopic } from "src/features/topics/components/create";
import { Topic } from "src/features/topics/components/page";
import { TopPage } from "src/libs/next/page";

export const Top = ({ data }: TopPage) => {
  return (
    <>
      <CreateTopic moods={data.moods} profile={data.profile} />
      <Topic topics={data.topics} />
    </>
  );
};
