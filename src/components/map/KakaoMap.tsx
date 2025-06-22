import styles from "@/styles/kakaoMap.module.css";
import useKakaoLoader from "@/components/map/UseKakaoLoaderOrigin";
import { useRef } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { useAppDispatch, useAppSelector } from "@/hooks/storeMap";
import { setLevel } from "@/features/map/mapSlice";
import { useMapDataFetch } from "@/hooks/useMapDataFetch";
import type { ClusterType } from "@/types/map";

function KakaoMap() {
  const scriptLoad = useKakaoLoader();
  const mapRef = useRef<kakao.maps.Map | null>(null);

  const dispatch = useAppDispatch();
  const { level, markers, clusters } = useAppSelector((state) => state.map);
  const { fetchMapData } = useMapDataFetch();

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
        <Map
          id="map"
          center={{ lat: 35.8691063, lng: 128.5953752 }}
          style={{ width: "100%", height: "100vh" }}
          level={level}
          onCreate={(map) => {
            mapRef.current = map;
            fetchMapData(map, map.getLevel());
          }}
          onZoomChanged={(map) => {
            const currentLevel = map.getLevel();
            dispatch(setLevel(currentLevel));
            fetchMapData(map, currentLevel);
          }}
          onDragEnd={(map) => {
            fetchMapData(map, map.getLevel());
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
      ) : (
        <div>
          <p>로딩중...</p>
        </div>
      )}
    </div>
  );
}

export default KakaoMap;
