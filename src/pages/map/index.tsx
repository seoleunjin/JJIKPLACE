import layoutStyles from "@/styles/layout.module.css";
import { pageMeta } from "@/constants/pageMeta";
import KakaoMap from "@/components/map/kakaoMap";
import MapSearch from "@/components/map/search";
import MapCategory from "@/components/map/category";

export default function MapPage() {
  return (
    <div>
      <div className={layoutStyles.layout_wrapper}>
        <KakaoMap></KakaoMap>
        <div>
          <MapSearch></MapSearch>
          <MapCategory></MapCategory>
        </div>
      </div>
    </div>
  );
}

MapPage.title = pageMeta.map.title;
