interface MapState {
  level: number;
  markers: MarkerType[];
  clusters: ClusterType[];
}
interface MarkerType {
  id: number;
  lat: number;
  lng: number;
  name: string;
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

export type { MarkerLevel, MapState, MarkerType, ClusterType };
