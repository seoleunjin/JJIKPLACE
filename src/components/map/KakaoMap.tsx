"use client";

import styles from "@/styles/kakaoMap.module.css";
import useKakaoLoader from "@/components/map/UseKakaoLoaderOrigin";
import { useRef, useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { useAppDispatch, useAppSelector } from "@/hooks/storeMap";
import {
  setLevel,
  setSelectedPosition,
  setCurrentPosition,
} from "@/features/map/mapSlice";
import { useMapDataFetch } from "@/hooks/useMapDataFetch";
import { useRouter } from "next/router";
import { CurrentPosition } from "@/assets/icons";
import Loading from "../common/Loading";

function KakaoMap() {
  const [isActive, setIsActive] = useState(false);
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
    currentPosition,
    searchPosition,
    startPoint,
    endPoint,
  } = useAppSelector((state) => state.map);
  const { fetchMapData } = useMapDataFetch();

  // query에서 좌표 세팅 (선택된 위치)
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

  // 지도 생성 후 선택 위치로 이동
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

  // searchPosition 변경 시 지도 이동 및 데이터 fetch
  useEffect(() => {
    if (mapRef.current && searchPosition) {
      const center = new kakao.maps.LatLng(
        searchPosition.lat,
        searchPosition.lng,
      );
      mapRef.current.setCenter(center);
      mapRef.current.setLevel(6);
      dispatch(setLevel(6));
      fetchMapData(mapRef.current, 6, category);
    }
  }, [searchPosition, category, dispatch, fetchMapData]);

  // 현위치 버튼 클릭 시 처리 함수
  const handleGoToCurrentLocation = () => {
    if (!mapRef.current) return;

    if (isActive) {
      dispatch(setCurrentPosition(null));
      setIsActive(false);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const locPosition = new kakao.maps.LatLng(lat, lng);

            mapRef.current!.setCenter(locPosition);
            mapRef.current!.setLevel(2);
            dispatch(setLevel(2));

            dispatch(setCurrentPosition({ lat, lng }));

            fetchMapData(mapRef.current!, 2, category);
            setIsActive(true);
          },
          (error) => {
            alert("위치 정보를 가져올 수 없습니다.");
            console.error(error);
          },
        );
      } else {
        alert("이 브라우저는 위치 정보 사용을 지원하지 않습니다.");
      }
    }
  };

  const onClusterclick = (cluster: { lat: number; lng: number }) => {
    const map = mapRef.current;
    if (!map) return;
    const nextLevel = map.getLevel() - 3;
    map.setLevel(nextLevel, {
      anchor: new kakao.maps.LatLng(cluster.lat, cluster.lng),
    });
  };

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
  useEffect(() => {
    async function getCarDirection() {
      if (!startPoint || !endPoint) return;

      const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
      const url = "https://apis-navi.kakaomobility.com/v1/directions";
      const origin = `${startPoint.lng},${startPoint.lat}`;
      const destination = `${endPoint.lng},${endPoint.lat}`;

      const headers = {
        Authorization: `KakaoAK ${REST_API_KEY}`,
        "Content-Type": "application/json",
      };

      const queryParams = new URLSearchParams({
        origin,
        destination,
        vehicle: "pedestrian",
      });

      const requestUrl = `${url}?${queryParams}`;

      try {
        const response = await fetch(requestUrl, {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("길찾기 응답", data);

        const linePath: kakao.maps.LatLng[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.routes[0].sections[0].roads.forEach((road: any) => {
          const vertexes = road.vertexes;
          for (let i = 0; i < vertexes.length; i += 2) {
            linePath.push(new kakao.maps.LatLng(vertexes[i + 1], vertexes[i]));
          }
        });

        // 지도가 준비되었을 때만 그리기
        if (mapRef.current) {
          const polyline = new kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 5,
            strokeColor: "#000000",
            strokeOpacity: 0.7,
            strokeStyle: "solid",
          });
          polyline.setMap(mapRef.current);
        }
      } catch (error) {
        console.error("길찾기 요청 오류:", error);
      }
    }

    getCarDirection();
  }, [startPoint, endPoint]);

  return (
    <div className={styles.kakaoMap}>
      {/* 내 위치 이동 버튼 */}
      <div className={styles.elementBox}>
        <button
          className={isActive ? styles.curLocBtnActive : styles.curLocBtn}
          onClick={handleGoToCurrentLocation}
        >
          <CurrentPosition />
        </button>
      </div>

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
          {/* 일반 마커들 */}
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

          {currentPosition && level < 6 && (
            <MapMarker
              position={{ lat: currentPosition.lat, lng: currentPosition.lng }}
              image={{
                src: "/my-location.png",
                size: { width: 35, height: 35 },
                options: { offset: { x: 18, y: 36 } },
              }}
            />
          )}
        </Map>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default KakaoMap;
