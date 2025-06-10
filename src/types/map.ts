// 마커
interface MarkerLevel {
  level: string;
  markers: Marker[];
}

interface Marker {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export type { MarkerLevel, Marker };
