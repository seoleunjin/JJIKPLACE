import { MapBounds } from "./api";

interface MapState {
  level: number;
  markers: MarkerType[];
  clusters: ClusterType[];
  category: string;
}

interface MarkerType {
  id: number;
  lat: number;
  lng: number;
  name: string;
  review_avg_score: number;
  review_cnt: number;
  road_addr: string;
}

interface ClusterType {
  count: number;
  lat: number;
  lng: number;
  name: string;
}

// 마커
interface MarkerLevel {
  level: string;
  markers: MarkerType[];
}

//mapThunks.ts
interface FetchClustersParams {
  level: number;
  bounds: MapBounds;
  category?: string;
}

export type {
  MarkerLevel,
  MapState,
  MarkerType,
  ClusterType,
  FetchClustersParams,
};
