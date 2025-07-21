import { MapBounds } from "./api";

interface NaviPosition {
  lat: number;
  lng: number;
  name: string;
}
interface Position {
  lat: number;
  lng: number;
}
interface MapState {
  level: number;
  markers: MarkerType[];
  clusters: ClusterType[];
  category: string;
  selectedPosition: Position | null;
  currentPosition: Position | null;
  searchPosition: Position | null;
  startPoint: Position | null;
  endPoint: Position | null;
}

interface MarkerType {
  id: number;
  lat: number;
  lng: number;
  name: string;
  review_avg_score: number;
  review_cnt: number;
  road_addr: string;
  thumbnail_url: string | null;
  categories: string[];
  is_favorite: boolean;
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
  NaviPosition,
  Position,
  MarkerLevel,
  MapState,
  MarkerType,
  ClusterType,
  FetchClustersParams,
};
