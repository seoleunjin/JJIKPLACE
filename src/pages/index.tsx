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
        <meta name="description" content="가까운 셀프사진관을 찾아보세요." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <main
          className={`${HomeStyles.home_wrapper} ${layoutStyles.layout_full_wrapper}`}
        >
          <HomeBanner />
          <PhotoStudioFinder />
          <div className={`${HomeStyles.home_container}`}>
            <LiveRanking />
            <DirectionFinder />
            <PoseGuide />
          </div>
        </main>
      </div>
    </>
  );
}
