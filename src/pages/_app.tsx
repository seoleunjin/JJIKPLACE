import Layout from "@/layout/Layout";
import Store from "@/store/index";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type PageWithTitle = AppProps["Component"] & { title?: string };

export default function App({ Component, pageProps }: AppProps) {
  const PageComponent = Component as PageWithTitle;
  const title = PageComponent.title || "";
  return (
    <Provider store={Store}>
      <Layout title={title}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
