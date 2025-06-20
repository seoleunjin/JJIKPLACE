import { ClusterType, MarkerType, MapState } from "@/types/map";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MapState = {
  level: 2,
  markers: [],
  clusters: [],
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setLevel(state, action: PayloadAction<number>) {
      state.level = action.payload;
    },
    setMarkers(state, action: PayloadAction<MarkerType[]>) {
      state.markers = action.payload;
    },
    setClusters(state, action: PayloadAction<ClusterType[]>) {
      state.clusters = action.payload;
    },
    resetMapState(state) {
      state.level = 2;
      state.markers = [];
      state.clusters = [];
    },
  },
});

export const { setLevel, resetMapState, setMarkers, setClusters } =
  mapSlice.actions;
export default mapSlice.reducer;
