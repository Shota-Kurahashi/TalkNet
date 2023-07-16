import React from "react";
import { TopPage } from "src/libs/next/page";

export const Top = ({ data }: TopPage) => {
  return <div>{data.topics[1]?.content}</div>;
};
