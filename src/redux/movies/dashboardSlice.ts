// src/redux/movies/dashboardSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DashboardState,
  Movie,
  Filters,
  FilterAction,
  OscarStats,
} from "@/types";
import { fetchMovieData } from "./dashboardThunks";

const initialState: DashboardState = {
  movies: [],
  filteredMovies: [],
  selectedMovie: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    year: null,
    genre: null,
    country: null,
    language: null,
  },
  oscarStats: {
    nominationsByYear: {},
    winsByYear: {},
  },
  topPerformers: {
    moviesByRating: [],
    moviesByOscars: [],
  },
};

const applyFilters = (movies: Movie[], filters: Filters): Movie[] => {
  return movies.filter((movie) => {
    if (filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase().trim();
      const movieTitle = movie.title.toLowerCase();
      if (!movieTitle.includes(searchTerm)) {
        return false;
      }
    }

    if (filters.year !== null && movie.year !== filters.year) {
      return false;
    }

    if (filters.genre !== null && !movie.genre.includes(filters.genre)) {
      return false;
    }

    if (filters.country !== null && !movie.country.includes(filters.country)) {
      return false;
    }

    if (
      filters.language !== null &&
      !movie.language.includes(filters.language)
    ) {
      return false;
    }

    return true;
  });
};

const calculateStats = (movies: Movie[]) => {
  const oscarStats = movies.reduce(
    (acc, movie) => {
      const year = movie.year;
      acc.nominationsByYear[year] =
        (acc.nominationsByYear[year] || 0) + movie.oscar_nominations;
      acc.winsByYear[year] = (acc.winsByYear[year] || 0) + movie.oscar_winning;
      return acc;
    },
    { nominationsByYear: {}, winsByYear: {} } as OscarStats
  );

  return {
    oscarStats,
    topPerformers: {
      moviesByRating: [...movies].sort((a, b) => b.imdb_rating - a.imdb_rating),
      moviesByOscars: [...movies].sort(
        (a, b) => b.oscar_winning - a.oscar_winning
      ),
    },
  };
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterAction>) => {
      const { key, value } = action.payload;

      // Type-safe assignment using type narrowing
      if (key === "search") {
        state.filters.search = value; // TypeScript knows value is string here
      } else {
        state.filters[key] = value; // TypeScript knows value is string | null here
      }

      state.filteredMovies = applyFilters(state.movies, state.filters);
      const stats = calculateStats(state.filteredMovies);
      state.oscarStats = stats.oscarStats;
      state.topPerformers = stats.topPerformers;
    },

    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredMovies = state.movies;

      const stats = calculateStats(state.movies);
      state.oscarStats = stats.oscarStats;
      state.topPerformers = stats.topPerformers;
    },

    setSelectedMovie: (state, action: PayloadAction<Movie | null>) => {
      state.selectedMovie = action.payload;
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
          state.filteredMovies = action.payload;

          const stats = calculateStats(action.payload);
          state.oscarStats = stats.oscarStats;
          state.topPerformers = stats.topPerformers;
        }
      )
      .addCase(fetchMovieData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch movie data";
      });
  },
});

export const { setFilter, clearFilters, setSelectedMovie } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
