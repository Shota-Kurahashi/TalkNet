import { Profile } from "@prisma/client";
import { ReactElement, useState } from "react";
import { Background } from "src/components/elements/Background";
import { Aside } from "src/components/layouts/aisde";
import { Header } from "src/components/layouts/header";
import { Provider } from "src/components/layouts/provider";
import { Error } from "src/libs/error";
import { User } from "src/libs/schema/user";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider>{children}</Provider>
);

type PageProps = {
  data: {
    user: User | null;
    profile: Profile | null;
  };
  error: Error | null;
};

// eslint-disable-next-line @typescript-eslint/ban-types

export const BasicLayout = <T extends PageProps>(
  page: ReactElement,
  { data }: T
) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <LayoutProvider>
      <div className="min-h-screen">
        <Aside setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <div className="lg:pl-72">
          <Background />
          <Header data={data} setSidebarOpen={setSidebarOpen} />
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{page}</div>
          </main>
        </div>
      </div>
    </LayoutProvider>
  );
};

export const SimpleLayout = (page: ReactElement) => (
  <LayoutProvider>
    <Background />
    <main className="mx-auto min-h-screen max-w-7xl bg-white/30 py-10">
      <div className="px-4 sm:px-6 lg:px-8">{page}</div>
    </main>
  </LayoutProvider>
);
