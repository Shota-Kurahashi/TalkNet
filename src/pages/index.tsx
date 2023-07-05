import { BasicLayout } from "src/components/layouts/BasicLayout";
import { Meta } from "src/libs/meta";
import { NextPageWithLayout } from "src/libs/next";

const Page: NextPageWithLayout = () => {
  return <main />;
};

Page.getLayout = BasicLayout;
Page.getTitle = Meta(() => "TalkNet");

export default Page;
