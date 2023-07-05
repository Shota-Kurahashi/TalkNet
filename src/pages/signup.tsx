import React from "react";
import { SimpleLayout } from "src/components/layouts/BasicLayout";
import { SignUp } from "src/features/auth/components/signup";
import { Meta } from "src/libs/meta";
import { NextPageWithLayout } from "src/libs/next";

const Page: NextPageWithLayout = () => <SignUp />;

Page.getLayout = SimpleLayout;
Page.getTitle = Meta(() => "ログイン - TalkNet");

export default Page;
