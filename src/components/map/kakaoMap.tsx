import styles from "@/styles/kakaoMap.module.css";
import { fetchClusterData } from "@/api/map";
import useKakaoLoader from "@/components/map/useKakaoLoaderOrigin";
import { useCallback, useRef } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import type { RootState } from "@/store/mapIndex";
import { useDispatch, useSelector } from "react-redux";
import { setClusters, setLevel, setMarkers } from "@/features/map/mapSlice";
import { ClusterType } from "@/types/map";
function KakaoMap() {
  const scriptLoad = useKakaoLoader();
  const mapRef = useRef<kakao.maps.Map | null>(null);

  const { level, markers, clusters } = useSelector(
    (state: RootState) => state.map,
  );
  const dispatch = useDispatch();

  // 이전 fetch 조건 기억용 ref
  const prevParams = useRef<{
    level: number;
    swLat: number;
    swLng: number;
    neLat: number;
    neLng: number;
  } | null>(null);

  const fetchData = useCallback(async (map: kakao.maps.Map, level: number) => {
    if (!map) return;
    const getClusterApi = (level: number): string => {
      if (level >= 9) return "/cluster/sido";
      if (level >= 6) return "/cluster/gungu";
      if (level >= 3) return "/cluster/dongmyeon";
      return "/cluster/marker";
    };

    const bounds = map.getBounds();
    if (!bounds) return;

    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    const swLat = sw.getLat();
    const swLng = sw.getLng();
    const neLat = ne.getLat();
    const neLng = ne.getLng();

    // 이전 fetch 조건과 비교 (오차 허용)
    const prev = prevParams.current;
    const tolerance = 0.001;
    if (
      prev &&
      prev.level === level &&
      Math.abs(prev.swLat - swLat) < tolerance &&
      Math.abs(prev.swLng - swLng) < tolerance &&
      Math.abs(prev.neLat - neLat) < tolerance &&
      Math.abs(prev.neLng - neLng) < tolerance
    ) {
      // 동일 영역/레벨이면 fetch 안함
      return;
    }

    const path = getClusterApi(level);

    try {
      const { data } = await fetchClusterData(path, {
        swLat,
        swLng,
        neLat,
        neLng,
      });
      console.log("레벨값 확인", level);
      if (path === "/cluster/marker") {
        dispatch(setClusters([]));
        dispatch(setMarkers(data.markers ?? []));
      } else {
        dispatch(setMarkers([]));
        dispatch(setClusters(data.clusters ?? []));
      }

      // 현재 상태 저장
      prevParams.current = { level, swLat, swLng, neLat, neLng };
    } catch (err) {
      console.log("데이터 불러오기 실패", err);
    }
  }, []);

  const onClusterclick = (cluster: ClusterType) => {
    const map = mapRef.current;
    if (!map) return;

    const nextLevel = map.getLevel() - 3;
    map.setLevel(nextLevel, {
      anchor: new kakao.maps.LatLng(cluster.lat, cluster.lng),
    });
  };

  return (
    <div>
      {scriptLoad ? (
        <div>
          <Map
            id="map"
            center={{ lat: 35.8691063, lng: 128.5953752 }}
            style={{ width: "100%", height: "100vh" }}
            level={level}
            onCreate={(map) => {
              mapRef.current = map;
              fetchData(map, map.getLevel()); // 초기 데이터 호출
            }}
            onZoomChanged={(map) => {
              const currentLevel = map.getLevel();
              dispatch(setLevel(currentLevel));
              fetchData(map, currentLevel); // 줌 변경 시 fetch
            }}
            onDragEnd={(map) => {
              fetchData(map, map.getLevel());
            }}
          >
            {level < 3
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
                    <div
                      className={styles.clusterMarker}
                      onClick={() => onClusterclick(cluster)}
                    >
                      {cluster.count}
                    </div>
                  </CustomOverlayMap>
                ))}
          </Map>
        </div>
      ) : (
        <div>
          <p>로딩중</p>
        </div>
      )}
    </div>
  );
}

export default KakaoMap;
