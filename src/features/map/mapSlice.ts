import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ClusterType,
  MarkerType,
  MapState,
  SelectedPosition,
  CurrentPosition,
} from "@/types/map";

const initialState: MapState = {
  level: 2,
  markers: [],
  clusters: [],
  category: "",
  selectedPosition: null,
  searchPosition: null,
  currentPosition: null,
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
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSelectedPosition(state, action: PayloadAction<SelectedPosition | null>) {
      state.selectedPosition = action.payload;
    },
    setCurrentPosition(state, action: PayloadAction<CurrentPosition | null>) {
      state.currentPosition = action.payload;
    },
    setSearchPosition(
      state,
      action: PayloadAction<{ lat: number; lng: number } | null>,
    ) {
      state.searchPosition = action.payload;
    },
    resetMapState(state) {
      state.level = 2;
      state.markers = [];
      state.clusters = [];
      state.category = "";
      state.searchPosition = null;
      state.selectedPosition = null;
      state.currentPosition = null;
    },
  },
});

export const {
  setLevel,
  resetMapState,
  setMarkers,
  setClusters,
  setCategory,
  setSelectedPosition,
  setSearchPosition,
  setCurrentPosition,
} = mapSlice.actions;

export default mapSlice.reducer;
