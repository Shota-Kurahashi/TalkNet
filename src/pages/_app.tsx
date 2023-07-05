import { AppPropsWithLayout } from "src/libs/next/page";
import "src/styles/tailwind.css";

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const getTitle = Component.getTitle ?? ((page) => page);

  return getLayout(
    getTitle(<Component {...pageProps} />, pageProps),
    pageProps
  );
};

export default App;
