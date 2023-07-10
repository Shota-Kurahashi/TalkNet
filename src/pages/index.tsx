import { GetServerSideProps } from "next";
import { BasicLayout } from "src/components/layouts/BasicLayout";
import { getProfile } from "src/handlers/profiles/get";
import { Meta } from "src/libs/meta";

import { NextPageWithLayout, withSessionPage } from "src/libs/next/page";

const Page: NextPageWithLayout = () => {
  return <main />;
};

Page.getLayout = (page, props) => BasicLayout(page, props);
Page.getTitle = Meta(() => "TalkNet");

export const getServerSideProps: GetServerSideProps = withSessionPage(
  async ({ user }) => {
    const profile = await getProfile(user?.id);

    return {
      user,
      profile,
    };
  }
);
export default Page;
