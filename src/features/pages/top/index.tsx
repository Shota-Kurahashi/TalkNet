import React from "react";
import { CreateTopic } from "src/features/topics/components/create";
import { Topics } from "src/features/topics/components/page/topics";
import { TopPage } from "src/libs/next/page";

export const Top = ({ data }: TopPage) => {
  return (
    <>
      <CreateTopic moods={data.moods} profile={data.profile} />
      <Topics topics={data.topics} />
    </>
  );
};
