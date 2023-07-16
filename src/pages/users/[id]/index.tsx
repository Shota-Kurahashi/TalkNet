import React from "react";
import { BasicLayout } from "src/components/layouts/BasicLayout";
import { Profile } from "src/features/profiles/components";
import { getProfile } from "src/handlers/profiles/get";
import { getTopicsByUserId } from "src/handlers/topics/get";
import { getUser } from "src/handlers/users/get";
import { HttpError, NotFoundError } from "src/libs/error";
import { Meta } from "src/libs/meta";
import {
  NextPageWithLayout,
  ProfilePage,
  ProfilePageProps,
  withSessionPage,
} from "src/libs/next/page";

const Page: NextPageWithLayout<ProfilePage> = ({ data }) => {
  return <Profile {...data} />;
};

Page.getLayout = (page, props) => BasicLayout(page, props);
Page.getTitle = Meta(
  (props) => `${props.data.user.name}のプロフィール - TalkNet`
);

export const getServerSideProps = withSessionPage<ProfilePageProps>(
  async ({ query }) => {
    const { id } = query;

    try {
      const user = await getUser(Number(id));
      const profile = await getProfile(Number(id));
      const topics = await getTopicsByUserId(Number(id));

      return {
        profile,
        topics,
        user,
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
