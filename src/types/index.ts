// src/types/index.ts
export interface Movie {
  title: string;
  year: string;
  genre: string[];
  country: string[];
  imdb_rating: number;
  oscar_nominations: number;
  oscar_winning: number;
  cast: string[];
  language: string[];
  oscar_nominations_list: string[];
  oscar_winning_list: string[];
}

export type FilterValue = string | null;

// Make FilterAction a discriminated union type for better type safety
export type FilterAction =
  | { key: "search"; value: string }
  | { key: "year"; value: FilterValue }
  | { key: "genre"; value: FilterValue }
  | { key: "country"; value: FilterValue }
  | { key: "language"; value: FilterValue };

export interface Filters {
  search: string;
  year: FilterValue;
  genre: FilterValue;
  country: FilterValue;
  language: FilterValue;
}

export type FilterKey = keyof Filters;

export interface OscarStats {
  nominationsByYear: Record<string, number>;
  winsByYear: Record<string, number>;
}

export interface DashboardState {
  movies: Movie[];
  filteredMovies: Movie[];
  selectedMovie: Movie | null;
  loading: boolean;
  error: string | null;
  filters: Filters;
  oscarStats: OscarStats;
  topPerformers: {
    moviesByRating: Movie[];
    moviesByOscars: Movie[];
  };
}
