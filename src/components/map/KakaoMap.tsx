// components/map/KakaoMap.tsx
"use client";

import styles from "@/styles/kakaoMap.module.css";
import useKakaoLoader from "@/components/map/UseKakaoLoaderOrigin";
import { useRef, useEffect } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { useAppDispatch, useAppSelector } from "@/hooks/storeMap";
import { setLevel } from "@/features/map/mapSlice";
import { useMapDataFetch } from "@/hooks/useMapDataFetch";

function KakaoMap() {
  const scriptLoad = useKakaoLoader();
  const mapRef = useRef<kakao.maps.Map | null>(null);

  const dispatch = useAppDispatch();
  const { level, markers, clusters, category, selectedPosition } =
    useAppSelector((state) => state.map);
  const { fetchMapData } = useMapDataFetch();

  const onClusterclick = (cluster: { lat: number; lng: number }) => {
    const map = mapRef.current;
    if (!map) return;
    const nextLevel = map.getLevel() - 3;
    map.setLevel(nextLevel, {
      anchor: new kakao.maps.LatLng(cluster.lat, cluster.lng),
    });
  };

  // ✅ 선택된 위치로 지도 이동
  useEffect(() => {
    if (mapRef.current && selectedPosition) {
      const moveLatLng = new kakao.maps.LatLng(
        selectedPosition.lat,
        selectedPosition.lng,
      );
      mapRef.current.setCenter(moveLatLng);
      mapRef.current.setLevel(2);
      dispatch(setLevel(2));
      fetchMapData(mapRef.current, 2, category);
    }
  }, [selectedPosition, dispatch, fetchMapData, category]);

  return (
    <div>
      {scriptLoad ? (
        <Map
          id="map"
          center={{ lat: 35.8691063, lng: 128.5953752 }}
          style={{ width: "100%", height: "calc(100vh - 60px)" }}
          level={level}
          onCreate={(map) => {
            mapRef.current = map;
            fetchMapData(map, map.getLevel(), category);
          }}
          onZoomChanged={(map) => {
            const currentLevel = map.getLevel();
            if (currentLevel !== level) {
              dispatch(setLevel(currentLevel));
              fetchMapData(map, currentLevel, category);
            }
          }}
          onDragEnd={(map) => {
            fetchMapData(map, map.getLevel(), category);
          }}
        >
          {level < 3
            ? markers.map((marker) => {
                const isSearchSelected =
                  selectedPosition &&
                  Math.abs(marker.lat - selectedPosition.lat) < 0.00001 &&
                  Math.abs(marker.lng - selectedPosition.lng) < 0.00001;

                return (
                  <MapMarker
                    key={marker.id}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    image={{
                      src: isSearchSelected ? "/pin-active.svg" : "/pin.svg",
                      size: { width: 30, height: 38 },
                      options: { offset: { x: 21, y: 49 } },
                    }}
                  />
                );
              })
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
