import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main className={styles.main}>
          <div>
            <p>
              안녕하세요 suite 폰트입니다안녕하세요 suite 폰트입니다안녕하세요
              suite 폰트입니다안녕하세요 suite 폰트입니다
            </p>
          </div>
        </main>
        <footer>
          <div></div>
        </footer>
      </div>
    </>
  );
}
