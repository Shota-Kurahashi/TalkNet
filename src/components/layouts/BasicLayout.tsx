import Error from "next/error";
import { ReactElement, useState } from "react";
import { Background } from "src/components/elements/Background";
import { Aside } from "src/components/layouts/aisde";
import { Header } from "src/components/layouts/header";
import { Provider } from "src/components/layouts/provider";
import { User } from "src/libs/schema/user";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider>{children}</Provider>
);

type PageProps =
  | {
      data: {
        user: User | null;
      };

      error: null;
    }
  | {
      data: null;
      error: Error;
    };
// eslint-disable-next-line @typescript-eslint/ban-types

export const BasicLayout = (page: ReactElement, { data }: PageProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <LayoutProvider>
      <div>
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
    <main className="py-10">
      <div className="px-4 sm:px-6 lg:px-8">{page}</div>
    </main>
  </LayoutProvider>
);
