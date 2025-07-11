import Layout from "@/layout/Layout";
import Store from "@/store/index";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type PageWithTitle = AppProps["Component"] & { title?: string };

export default function App({ Component, pageProps }: AppProps) {
  const PageComponent = Component as PageWithTitle;
  const title = PageComponent.title || "";
  const queryClient = new QueryClient();
  return (
    <Provider store={Store}>
      <QueryClientProvider client={queryClient}>
        <Layout title={title}>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </Provider>
  );
}
