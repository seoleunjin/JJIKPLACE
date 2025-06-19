// features/map/mapThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchClusterData } from "@/api/map";
import type { MapBounds } from "@/types/api";
import type { ClusterType, MarkerType } from "@/types/map";

interface FetchClustersParams {
  level: number;
  bounds: MapBounds;
  category?: string;
}

const getClusterApi = (level: number) => {
  if (level >= 9) return "/cluster/sido";
  if (level >= 6) return "/cluster/gungu";
  if (level >= 3) return "/cluster/dongmyeon";
  return "/cluster/marker";
};

export const fetchClusters = createAsyncThunk<
  { markers: MarkerType[]; clusters: ClusterType[]; path: string },
  FetchClustersParams
>("map/fetchClusters", async ({ level, bounds, category }) => {
  const path = getClusterApi(level);
  const response = await fetchClusterData(path, bounds, category);
  return { ...response.data, path };
});
