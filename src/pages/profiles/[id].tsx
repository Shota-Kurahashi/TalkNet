import { GetServerSideProps } from "next";
import React from "react";
import { SimpleLayout } from "src/components/layouts/BasicLayout";
import { Profile } from "src/features/profiles/components";
import { getProfile } from "src/handlers/profiles/get";
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

Page.getLayout = SimpleLayout;
Page.getTitle = Meta(() => "プロフィール - TalkNet");

export default Page;

export const getServerSideProps: GetServerSideProps =
  withSessionPage<ProfilePageProps>(async ({ user }) => {
    const profile = await getProfile(user?.id);

    return {
      user,
      profile,
    };
  });
