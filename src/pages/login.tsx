import React from "react";
import { SimpleLayout } from "src/components/layouts/BasicLayout";
import { Login } from "src/features/auth/components/login";
import { Meta } from "src/libs/meta";
import { NextPageWithLayout } from "src/libs/next";

const Page: NextPageWithLayout = () => <Login />;

Page.getLayout = SimpleLayout;
Page.getTitle = Meta(() => "ログイン - TalkNet");

export default Page;
