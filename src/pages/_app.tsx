import Layout from "@/layout/Layout";
import mapStore from "@/store/mapIndex";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

type PageWithTitle = AppProps["Component"] & { title?: string };

export default function App({ Component, pageProps }: AppProps) {
  const PageComponent = Component as PageWithTitle;
  const title = PageComponent.title || "";
  return (
    <Provider store={mapStore}>
      <Layout title={title}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
