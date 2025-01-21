// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "@/redux/movies/dashboardSlice";

export const store = configureStore({
  reducer: {
    movies: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      ignoredActions: ["dashboard/fetchMovieData/fulfilled"],
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
