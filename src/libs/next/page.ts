import { GetServerSidePropsContext, NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { HttpError, UnauthorizedError } from "src/libs/error";
import { User } from "src/libs/schema/user";
import { getSession } from "src/libs/session";
import { assertUser } from "src/libs/validation";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  getTitle?: (page: ReactElement, pageProps: P) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type WithSessionNextFunction<T> = (
  ctx: GetServerSidePropsContext & { user: User }
) => Promise<T>;

export const withSessionPage = <T>(nest: WithSessionNextFunction<T>) => {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx.req, ctx.res);
    try {
      assertUser(session.user);
    } catch (error: unknown) {
      if (error instanceof UnauthorizedError) {
        session.redirect = ctx.resolvedUrl;

        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      if (error instanceof HttpError) {
        return {
          props: {
            data: null,
            error: error.throwMessage(),
          },
        };
      }

      throw error;
    }

    const data = await nest({ ...ctx, user: session.user });

    return {
      props: {
        data,
        error: null,
      },
    };
  };
};
