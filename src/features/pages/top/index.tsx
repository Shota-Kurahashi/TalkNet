import React from "react";
import { CreateTopic } from "src/features/topics/components/create";
import { TopPage } from "src/libs/next/page";

export const Top = ({ data }: TopPage) => {
  return <CreateTopic profile={data.profile} />;
};
