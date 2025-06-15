interface MapBounds {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
}

interface MarkerType {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

interface ClusterType {
  name: string;
  count: number;
  lat: number;
  lng: number;
}

export type { MapBounds, MarkerType, ClusterType };
