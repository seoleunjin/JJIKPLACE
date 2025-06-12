import styles from "@/styles/kakaoMap.module.css";
import { fetchClusterData } from "@/api/map";
import useKakaoLoader from "@/components/map/useKakaoLoaderOrigin";
import { ClusterType, MarkerType } from "@/types/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

function KakaoMap() {
  const scriptLoad = useKakaoLoader();
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [level, setLevel] = useState(3);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [clusters, setClusters] = useState<ClusterType[]>([]);

  const getClusterApi = (level: number): string => {
    if (level >= 9) return "/cluster/sido";
    if (level >= 6) return "/cluster/gungu";
    if (level >= 3) return "/cluster/dongmyeon";
    return "/cluster/marker";
  };

  const fetchData = useCallback(async (map: kakao.maps.Map, level: number) => {
    if (!map) return;
    const path = getClusterApi(level);
    const bounds = map.getBounds();
    if (!bounds) return;

    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    const swLat = sw.getLat();
    const swLng = sw.getLng();
    const neLat = ne.getLat();
    const neLng = ne.getLng();

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
        setMarkers([]);
        setClusters(data.clusters ?? []);
      }
    } catch (err) {
      console.log("데이터 불러오기 실패", err);
    }
  }, []);

  const onClusterclick = (cluster: ClusterType) => {
    const map = mapRef.current;
    if (!map) return;

    const nextLevel = map.getLevel() - 1;
    map.setLevel(nextLevel, {
      anchor: new kakao.maps.LatLng(cluster.lat, cluster.lng),
    });
  };

  //   레벨이 변경될때때마다 렌더링
  useEffect(() => {
    if (mapRef.current) {
      fetchData(mapRef.current, level);
    }
  }, [level, fetchData]);

  return (
    <div>
      {scriptLoad ? (
        <div>
          <Map
            id="map"
            center={{ lat: 35.869601, lng: 128.593139 }}
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
                  ></MapMarker>
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
