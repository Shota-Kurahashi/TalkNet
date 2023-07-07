import React from "react";
import { SimpleLayout } from "src/components/layouts/BasicLayout";
import { Profile } from "src/features/profiles/components";
import { Meta } from "src/libs/meta";
import { NextPageWithLayout } from "src/libs/next/page";

const Page: NextPageWithLayout = () => {
  return <Profile />;
};

Page.getLayout = SimpleLayout;
Page.getTitle = Meta(() => "プロフィール - TalkNet");

export default Page;
