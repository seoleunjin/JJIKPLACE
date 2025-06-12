import layoutStyles from "@/styles/layout.module.css";
import { pageMeta } from "@/constants/pageMeta";
import KakaoMap from "@/components/map/kakaoMap";

export default function MapPage() {
  return (
    <div>
      <div className={layoutStyles.layout_full_wrapper}>
        <KakaoMap></KakaoMap>
      </div>
    </div>
  );
}

MapPage.title = pageMeta.map.title;
