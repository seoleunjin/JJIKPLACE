import layoutStyles from "@/styles/layout.module.css";
import { pageMeta } from "@/constants/pageMeta";
import KakaoMap from "@/components/map/KakaoMap";
import MapSearch from "@/components/map/Search";
import MapCategory from "@/components/map/Category";

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
