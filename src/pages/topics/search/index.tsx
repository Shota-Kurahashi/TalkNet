import React from "react";
import { BasicLayout } from "src/components/layouts/BasicLayout";
import { Search } from "src/features/topics/components/page/search";
import { getMoods } from "src/handlers/moods";
import { getProfile } from "src/handlers/profiles/get";
import { searchTopics } from "src/handlers/topics/search";
import { Meta } from "src/libs/meta";
import {
  NextPageWithLayout,
  SearchPage,
  SearchPageProps,
  withSessionPage,
} from "src/libs/next/page";

const Page: NextPageWithLayout<SearchPage> = (props) => {
  return <Search {...props} />;
};

Page.getLayout = (page, props) => BasicLayout(page, props);
Page.getTitle = Meta(() => `Topicsの検索 - TalkNet`);

export const getServerSideProps = withSessionPage<SearchPageProps>(
  async ({ user, query }) => {
    const { q } = query;

    const topics = await searchTopics(String(q));
    const profile = await getProfile(user?.id);
    const moods = await getMoods();

    return {
      topics,
      user,
      profile,
      moods,
    };
  }
);

export default Page;
