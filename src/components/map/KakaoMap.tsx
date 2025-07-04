"use client";

import styles from "@/styles/kakaoMap.module.css";
import useKakaoLoader from "@/components/map/UseKakaoLoaderOrigin";
import { useRef, useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { useAppDispatch, useAppSelector } from "@/hooks/storeMap";
import { setLevel, setSelectedPosition } from "@/features/map/mapSlice";
import { useMapDataFetch } from "@/hooks/useMapDataFetch";
import { useRouter } from "next/router";

function KakaoMap() {
  const router = useRouter();
  const scriptLoad = useKakaoLoader();
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [mapCreated, setMapCreated] = useState(false);

  const dispatch = useAppDispatch();
  const {
    level,
    markers,
    clusters,
    category,
    selectedPosition,
    searchPosition,
  } = useAppSelector((state) => state.map);
  const { fetchMapData } = useMapDataFetch();

  const onClusterclick = (cluster: { lat: number; lng: number }) => {
    const map = mapRef.current;
    if (!map) return;
    const nextLevel = map.getLevel() - 3;
    map.setLevel(nextLevel, {
      anchor: new kakao.maps.LatLng(cluster.lat, cluster.lng),
    });
  };

  // ✅ 1. query에서 좌표 세팅
  useEffect(() => {
    const { lat, lng } = router.query;
    if (lat && lng) {
      dispatch(
        setSelectedPosition({
          lat: parseFloat(lat as string),
          lng: parseFloat(lng as string),
        }),
      );
    }
  }, [router.query, dispatch]);

  // ✅ 2. 지도 준비 완료 후 selectedPosition 반영
  useEffect(() => {
    if (mapCreated && selectedPosition && mapRef.current) {
      const moveLatLng = new kakao.maps.LatLng(
        selectedPosition.lat,
        selectedPosition.lng,
      );
      mapRef.current.setCenter(moveLatLng);
      mapRef.current.setLevel(2);
      dispatch(setLevel(2));
      fetchMapData(mapRef.current, 2, category);
    }
  }, [mapCreated, selectedPosition, dispatch, fetchMapData, category]);

  // ✅ 3. searchPosition 변경 시 지도 이동 + 클러스터 호출
  useEffect(() => {
    if (mapRef.current && searchPosition) {
      const center = new window.kakao.maps.LatLng(
        searchPosition.lat,
        searchPosition.lng,
      );
      mapRef.current.setCenter(center);
      mapRef.current.setLevel(6);
      dispatch(setLevel(6));
      fetchMapData(mapRef.current, 6, category);
    }
  }, [searchPosition, category, dispatch, fetchMapData]);

  const handleMarkerClick = ({
    id,
    lat,
    lng,
    router,
  }: {
    id: number;
    lat: number;
    lng: number;
    router: ReturnType<typeof useRouter>;
  }) => {
    const newPos = { lat, lng };

    dispatch(setSelectedPosition(newPos));
    dispatch(setLevel(2));
    mapRef.current?.setCenter(new kakao.maps.LatLng(lat, lng));
    mapRef.current?.setLevel(2);

    router.push(
      {
        pathname: router.pathname,
        query: {
          id,
          lat: lat.toFixed(6),
          lng: lng.toFixed(6),
        },
      },
      undefined,
      { shallow: true },
    );
  };

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
            setMapCreated(true);
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
                  marker.id === parseInt(router.query.id as string, 10);

                return (
                  <MapMarker
                    key={marker.id}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    image={{
                      src: isSearchSelected ? "/pin-active.svg" : "/pin.svg",
                      size: { width: 30, height: 38 },
                      options: { offset: { x: 21, y: 49 } },
                    }}
                    onClick={() =>
                      handleMarkerClick({
                        id: marker.id,
                        lat: marker.lat,
                        lng: marker.lng,
                        router,
                      })
                    }
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
