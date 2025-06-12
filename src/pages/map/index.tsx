import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import useKakaoLoader from "@/components/map/useKakaoLoaderOrigin";
import layoutStyles from "@/styles/layout.module.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { pageMeta } from "@/constants/pageMeta";
import { ClusterType, MarkerType } from "@/types/api";
import { fetchClusterData } from "@/api/map";

export default function MapPage() {
  const scriptLoad = useKakaoLoader();
  const [level, setLevel] = useState(3);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [clusters, setClusters] = useState<ClusterType[]>([]);
  const mapRef = useRef<kakao.maps.Map | null>(null);

  const getClusterApi = (level: number): string => {
    if (level >= 10) return "/cluster/sido";
    if (level >= 7) return "/cluster/gungu";
    if (level >= 5) return "/cluster/dongmyeon";
    return "/cluster/marker";
  };

  const fetchData = useCallback(
    async (map: kakao.maps.Map | null, level: number) => {
      if (!map) return;

      const bounds = map.getBounds();
      if (!bounds) return;

      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      const swLat = sw.getLat();
      const swLng = sw.getLng();
      const neLat = ne.getLat();
      const neLng = ne.getLng();

      const path = getClusterApi(level);

      try {
        const { data } = await fetchClusterData(path, {
          swLat,
          swLng,
          neLat,
          neLng,
        });

        if (path === "/cluster/marker") {
          setMarkers(data.markers ?? []);
          setClusters([]);
        } else {
          setClusters(data.clusters ?? []);
          setMarkers([]);
        }
      } catch (err) {
        console.error("데이터 불러오기 실패", err);
      }
    },
    [], // fetchData는 컴포넌트 마운트 시 1회만 생성되므로 의존성 없음
  );

  useEffect(() => {
    if (mapRef.current) {
      fetchData(mapRef.current, level);
    }
  }, [level, fetchData]);

  return (
    <div>
      <div className={layoutStyles.layout_full_wrapper}>
        {scriptLoad ? (
          <Map
            id="map"
            center={{ lat: 35.8714, lng: 128.6014 }} // 대구 중앙로 기준 좌표
            style={{ width: "100%", height: "100vh" }}
            level={level}
            onCreate={(map) => {
              mapRef.current = map;
              fetchData(map, map.getLevel());
            }}
            onZoomChanged={(map) => {
              const currentLevel = map.getLevel();
              setLevel(currentLevel);
            }}
          >
            {level < 5
              ? markers.map((marker) => (
                  <MapMarker
                    key={marker.id}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    image={{
                      src: "/pin-active.svg",
                      size: { width: 30, height: 38 },
                      options: { offset: { x: 21, y: 49 } },
                    }}
                  />
                ))
              : clusters.map((cluster) => (
                  <CustomOverlayMap
                    key={cluster.name}
                    position={{ lat: cluster.lat, lng: cluster.lng }}
                    yAnchor={1}
                  >
                    <div className="cluster-marker">{cluster.count}</div>
                  </CustomOverlayMap>
                ))}
          </Map>
        ) : (
          <div>지도 로딩중</div>
        )}
      </div>

      <style jsx>{`
        .cluster-marker {
          width: 40px;
          height: 40px;
          background: rgba(0, 128, 255, 0.85);
          border-radius: 50%;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 16px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

MapPage.title = pageMeta.map.title;
