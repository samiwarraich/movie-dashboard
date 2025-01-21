// src/types/index.ts
export interface Movie {
  title: string;
  year: string;
  genre: string[];
  country: string[];
  imdb_rating: number;
  oscar_nominations: number;
  oscar_winning: number;
  language: string[];
  oscar_nominations_list: string[];
  oscar_winning_list: string[];
}

export type FilterValue = string | null;

export interface Filters {
  search: string;
  year: FilterValue;
  genre: FilterValue;
  country: FilterValue;
  language: FilterValue;
}

// Explicitly define keys that can be used for filtering
export type FilterKey = keyof Filters;

export interface OscarStats {
  nominationsByYear: Record<string, number>;
  winsByYear: Record<string, number>;
}

export interface DashboardState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  filters: Filters;
}
