import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { DashboardState, Movie, FilterKey } from "@/types";
import { fetchMovieData } from "./actions";

const initialState: DashboardState = {
  movies: [],
  loading: false,
  error: null,
  filters: {
    search: "",
    year: null,
    genre: null,
    country: null,
    language: null,
  },
};

interface SetFilterPayload {
  key: FilterKey;
  value: string | null;
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<SetFilterPayload>) => {
      const { key, value } = action.payload;
      if (key === "search") {
        state.filters[key] = value || "";
      } else {
        state.filters[key] = value;
      }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMovieData.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.loading = false;
          state.movies = action.payload;
        }
      )
      .addCase(fetchMovieData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch movie data";
      });
  },
});

export const { setFilter, clearFilters } = dashboardSlice.actions;
export default dashboardSlice.reducer;
