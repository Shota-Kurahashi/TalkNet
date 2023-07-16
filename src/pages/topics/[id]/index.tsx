import React from "react";
import { BasicLayout } from "src/components/layouts/BasicLayout";
import { Topic } from "src/features/topics/components/page/topic";
import { getProfile } from "src/handlers/profiles/get";
import { getTopic } from "src/handlers/topics/get";
import { HttpError, NotFoundError } from "src/libs/error";
import { Meta } from "src/libs/meta";
import {
  NextPageWithLayout,
  TopicPage,
  TopicPageProps,
  withSessionPage,
} from "src/libs/next/page";

const Page: NextPageWithLayout<TopicPage> = (props) => {
  return <Topic {...props} />;
};

Page.getLayout = (page, props) => BasicLayout(page, props);
Page.getTitle = Meta((props) => `${props.data.topic?.title} - TalkNet`);

export const getServerSideProps = withSessionPage<TopicPageProps>(
  async ({ user, query }) => {
    const { id } = query;

    try {
      const profile = await getProfile(user?.id);
      const topic = await getTopic(Number(id));

      return {
        user,
        profile,
        topic,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError();
      }
      throw new HttpError(500);
    }
  }
);
export default Page;
