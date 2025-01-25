import type { Movie, Filters, FilterKey } from "@/types";

export const applyMovieFilters = (
  movies: Movie[],
  filters: Filters
): Movie[] => {
  return movies.filter((movie) => {
    if (
      filters.search &&
      !movie.title.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    if (filters.year && movie.year !== filters.year) {
      return false;
    }
    if (filters.genre && !movie.genre.includes(filters.genre)) {
      return false;
    }
    if (filters.country && !movie.country.includes(filters.country)) {
      return false;
    }
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
  const values = movies.reduce((acc: Set<string>, movie) => {
    if (Array.isArray(movie[key])) {
      (movie[key] as string[]).forEach((value) => acc.add(value));
    } else {
      acc.add(movie[key] as string);
    }
    return acc;
  }, new Set<string>());

  return Array.from(values).sort();
};

export const getFilteredMoviesExcludingFilter = (
  movies: Movie[],
  filters: Filters,
  excludeKey: FilterKey
): Movie[] => {
  const tempFilters = { ...filters };
  if (excludeKey === "search") {
    tempFilters.search = "";
  } else {
    tempFilters[excludeKey] = null;
  }
  return applyMovieFilters(movies, tempFilters);
};
