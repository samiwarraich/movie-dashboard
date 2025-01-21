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

export interface Filters {
  search: string;
  year: string | null;
  genre: string | null;
  country: string | null;
  language: string | null;
}

export type FilterKeys = keyof Filters;

// Make FilterAction a discriminated union type
export type FilterAction =
  | { key: "search"; value: string }
  | { key: "year"; value: string | null }
  | { key: "genre"; value: string | null }
  | { key: "country"; value: string | null }
  | { key: "language"; value: string | null };

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
