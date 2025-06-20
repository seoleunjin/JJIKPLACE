// hooks/useMapDataFetch.ts
import { useCallback, useRef } from "react";
import { useAppDispatch } from "@/hooks/storeMap";
import { fetchClusters } from "@/features/map/mapThunks";
import { setMarkers, setClusters } from "@/features/map/mapSlice";

interface PrevParams {
  level: number;
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
  category?: string;
}

export function useMapDataFetch() {
  const dispatch = useAppDispatch();
  const prevParams = useRef<PrevParams | null>(null);

  /**
   * 지도 상태(레벨, 범위, 카테고리)에 따라 데이터(fetchClusters) 요청 후
   * 마커/클러스터 상태를 리덕스에 업데이트
   * 이전 요청과 조건 동일하면 중복 호출 방지
   */
  const fetchMapData = useCallback(
    async (
      map: kakao.maps.Map,
      level: number,
      category?: string, // 기본 undefined로 변경
    ) => {
      if (!map) return;

      const bounds = map.getBounds();
      if (!bounds) return;

      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      const swLat = sw.getLat();
      const swLng = sw.getLng();
      const neLat = ne.getLat();
      const neLng = ne.getLng();

      const tolerance = 0.001;
      const prev = prevParams.current;

      if (
        prev &&
        prev.level === level &&
        Math.abs(prev.swLat - swLat) < tolerance &&
        Math.abs(prev.swLng - swLng) < tolerance &&
        Math.abs(prev.neLat - neLat) < tolerance &&
        Math.abs(prev.neLng - neLng) < tolerance &&
        prev.category === category
      ) {
        // 이전 조건과 동일하면 중복 호출 방지
        return;
      }

      prevParams.current = { level, swLat, swLng, neLat, neLng, category };

      const action = await dispatch(
        fetchClusters({
          level,
          bounds: { swLat, swLng, neLat, neLng },
          category,
        }),
      );

      if (fetchClusters.fulfilled.match(action)) {
        const { path, markers, clusters } = action.payload;

        if (path === "/cluster/marker") {
          dispatch(setClusters([]));
          dispatch(setMarkers(markers ?? []));
          if (process.env.NODE_ENV === "development") {
            console.log("마커 데이터:", markers);
          }
        } else {
          dispatch(setMarkers([]));
          dispatch(setClusters(clusters ?? []));
          if (process.env.NODE_ENV === "development") {
            console.log("클러스터 데이터:", clusters);
          }
        }
      }
    },
    [dispatch],
  );

  return { fetchMapData };
}
