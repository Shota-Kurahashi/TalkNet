/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Inter } from "next/font/google";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import React, { useState } from "react";
import { NotificationProvider } from "src/components/elements/Notification/provider";
import { queryClient } from "src/libs/client";

type Props = {
  children: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  const [client] = useState(() => queryClient);

  return (
    <QueryClientProvider client={client}>
      <Head>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
      </Head>
      {/* <ErrorBoundary FallbackComponent={() => <div>Something went wrong</div>}> */}
      <NotificationProvider>
        <NextNProgress
          color="#6366f1"
          height={2}
          options={{ showSpinner: false }}
          startPosition={0.1}
        />
        {children}
      </NotificationProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      {/* </ErrorBoundary> */}
    </QueryClientProvider>
  );
};
