// src/utils/movieHelpers.ts
import type { Movie, Filters, OscarStats } from "@/types";

export const applyMovieFilters = (
  movies: Movie[],
  filters: Filters
): Movie[] => {
  return movies.filter((movie) => {
    // Search filter
    if (
      filters.search &&
      !movie.title.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Year filter
    if (filters.year && movie.year !== filters.year) {
      return false;
    }

    // Genre filter
    if (filters.genre && !movie.genre.includes(filters.genre)) {
      return false;
    }

    // Country filter
    if (filters.country && !movie.country.includes(filters.country)) {
      return false;
    }

    // Language filter
    if (filters.language && !movie.language.includes(filters.language)) {
      return false;
    }

    return true;
  });
};

export const getUniqueValues = (
  movies: Movie[],
  key: keyof Movie
): string[] => {
  if (key === "year") {
    return [...new Set(movies.map((movie) => movie[key]))].sort().reverse();
  }

  const values = movies.flatMap((movie) => {
    const value = movie[key];
    return Array.isArray(value) ? value : [value.toString()];
  });

  return [...new Set(values)].sort();
};

export const calculateOscarStats = (movies: Movie[]): OscarStats => {
  const stats: OscarStats = {
    nominationsByYear: {},
    winsByYear: {},
  };

  movies.forEach((movie) => {
    // Initialize the year if it doesn't exist
    if (!stats.nominationsByYear[movie.year]) {
      stats.nominationsByYear[movie.year] = 0;
      stats.winsByYear[movie.year] = 0;
    }

    // Add the nominations and wins
    stats.nominationsByYear[movie.year] += movie.oscar_nominations;
    stats.winsByYear[movie.year] += movie.oscar_winning;
  });

  return stats;
};
