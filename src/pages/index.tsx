import Head from "next/head";
import layoutStyles from "@/styles/layout.module.css";
import HomeStyles from "@/styles/home.module.css";
import HomeBanner from "@/components/home/HomeBanner";
import PhotoStudioFinder from "@/components/home/PhotoStudioFinder";
import LiveRanking from "@/components/home/LiveRanking";
import DirectionFinder from "@/components/home/DirectionFinder";
import PoseGuide from "@/components/home/PoseGuide";

export default function Home() {
  return (
    <>
      <Head>
        <title>JJIK PLACE</title>

        <meta property="og:type" content="website" />
        <meta property="og:title" content="JJIK PLACE" />
        <meta
          property="og:description"
          content="가까운 셀프사진관을 찾아보세요."
        />
        <meta property="og:url" content="https://jjikplace.netlify.app" />
        <meta
          property="og:image"
          content="https://jjikplace.netlify.app/thumbnail.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={layoutStyles.width}>
        <main className={HomeStyles.home_wrapper}>
          <HomeBanner />
          <PhotoStudioFinder />
          <div className={HomeStyles.home_container}>
            <LiveRanking />
            <DirectionFinder />
            <PoseGuide />
          </div>
        </main>
      </div>
    </>
  );
}
