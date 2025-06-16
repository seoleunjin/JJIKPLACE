import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "@/features/map/mapSlice";

const mapStore = configureStore({
  reducer: {
    map: mapReducer,
  },
});

export type RootState = ReturnType<typeof mapStore.getState>;
export type AppDispatch = typeof mapStore.dispatch;

export default mapStore;
