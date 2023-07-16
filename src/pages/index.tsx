import { BasicLayout } from "src/components/layouts/BasicLayout";
import { Top } from "src/features/pages/top";
import { getProfile } from "src/handlers/profiles/get";
import { getTopics } from "src/handlers/topics/get";
import { Meta } from "src/libs/meta";

import {
  NextPageWithLayout,
  TopPage,
  TopPageProps,
  withSessionPage,
} from "src/libs/next/page";

const Page: NextPageWithLayout<TopPage> = (props) => {
  return <Top {...props} />;
};

Page.getLayout = (page, props) => BasicLayout(page, props);
Page.getTitle = Meta(() => "TalkNet");

export const getServerSideProps = withSessionPage<TopPageProps>(
  async ({ user }) => {
    const profile = await getProfile(user?.id);
    const topics = await getTopics();

    return {
      user,
      profile,
      topics,
    };
  }
);
export default Page;
