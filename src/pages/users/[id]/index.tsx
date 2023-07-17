import React from "react";
import { BasicLayout } from "src/components/layouts/BasicLayout";
import { User } from "src/features/users/components/pages";
import { getProfile } from "src/handlers/profiles/get";
import { getTopicsByUserId } from "src/handlers/topics/get";
import { getUser } from "src/handlers/users/get";
import { HttpError, NotFoundError } from "src/libs/error";
import { Meta } from "src/libs/meta";
import {
  NextPageWithLayout,
  UserPage,
  UserPageProps,
  withSessionPage,
} from "src/libs/next/page";

const Page: NextPageWithLayout<UserPage> = (props) => {
  return <User {...props} />;
};

Page.getLayout = (page, props) => BasicLayout(page, props);
Page.getTitle = Meta(
  (props) => `${props.data.user.name}のプロフィール - TalkNet`
);

export const getServerSideProps = withSessionPage<UserPageProps>(
  async ({ query, user }) => {
    const { id } = query;

    try {
      const currentUser = await getUser(Number(id));
      const currentProfile = await getProfile(Number(id));
      const topics = await getTopicsByUserId(Number(id));
      const profile = await getProfile(user?.id);

      return {
        profile,
        topics,
        user,
        currentProfile,
        currentUser,
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
