import { GetServerSideProps } from "next";
import { BasicLayout } from "src/components/layouts/BasicLayout";
import { Meta } from "src/libs/meta";

import { NextPageWithLayout, withSessionPage } from "src/libs/next/page";

const Page: NextPageWithLayout = () => {
  return <main />;
};

Page.getLayout = (page, props) => BasicLayout(page, props);
Page.getTitle = Meta(() => "TalkNet");

export const getServerSideProps: GetServerSideProps = withSessionPage(
  async ({ user }) => {
    return {
      user,
    };
  }
);
export default Page;
