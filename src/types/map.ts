import { MapBounds } from "./api";

interface SelectedPosition {
  lat: number;
  lng: number;
}

interface SearchPosition {
  lat: number;
  lng: number;
}

interface MapState {
  level: number;
  markers: MarkerType[];
  clusters: ClusterType[];
  category: string;
  selectedPosition: SelectedPosition | null;
  searchPosition: SearchPosition | null;
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
  SelectedPosition,
  MarkerLevel,
  MapState,
  MarkerType,
  ClusterType,
  FetchClustersParams,
};
