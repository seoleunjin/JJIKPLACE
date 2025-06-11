import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "@/components/map/useKakaoLoaderOrigin";
import layoutStyles from "@/styles/layout.module.css";
import { fetchMarker } from "@/api/map";
import { useEffect, useState } from "react";
import { Marker } from "@/types/map";

export default function MapPage() {
  const scriptLoad = useKakaoLoader();
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const fecthData = async () => {
      const swLat = 35.0;
      const swLng = 127.0;
      const neLat = 37.15;
      const neLng = 127.5;
      try {
        const { data } = await fetchMarker({ swLat, swLng, neLat, neLng });
        console.log(data);
        setMarkers(data.markers);
      } catch (error) {
        console.error("마커 에러", error);
      }
    };
    fecthData();
  }, []);

  return (
    <div>
      <div className={layoutStyles.layout_full_wrapper}>
        {scriptLoad ? (
          <Map
            id="map"
            center={{ lat: 36.3504, lng: 127.3845 }}
            style={{ width: "100%", height: "100vh" }}
            level={3}
          >
            {/* 마커 생성 */}
            {markers?.map((marker, id) => (
              <MapMarker
                key={id}
                position={{ lat: marker.lat, lng: marker.lng }}
                image={{
                  src: "/pin-active.svg",
                  size: { width: 30, height: 38 },
                  options: { offset: { x: 21, y: 49 } },
                }}
              />
            ))}
          </Map>
        ) : (
          <div>지도 로딩중</div>
        )}
      </div>
    </div>
  );
}

// 해더 제목 무조건 맨 하단 배치
MapPage.title = "지도";
