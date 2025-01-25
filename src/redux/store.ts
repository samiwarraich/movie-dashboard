import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "@/redux/movies/slice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
