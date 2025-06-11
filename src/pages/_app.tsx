import Layout from "@/layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

type PageWithTitle = AppProps["Component"] & { title?: string };

export default function App({ Component, pageProps }: AppProps) {
  const PageComponent = Component as PageWithTitle;
  const title = PageComponent.title || "";
  return (
    <Layout title={title}>
      <Component {...pageProps} />
    </Layout>
  );
}
