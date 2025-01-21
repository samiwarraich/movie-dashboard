import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "@/redux/movies/dashboard-slice";

export const store = configureStore({
  reducer: {
    movies: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
