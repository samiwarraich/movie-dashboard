import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "@/redux/hooks";
import { setFilter, clearFilters } from "@/redux/movies/dashboardSlice";
import { applyMovieFilters } from "@/utils/movieHelpers";
import type { FilterKey, FilterValue, Movie } from "@/types";

interface FilterOptions {
  years: string[];
  genres: string[];
  countries: string[];
  languages: string[];
}

export const useMovieFilters = () => {
  const dispatch = useDispatch();
  const { movies, filters } = useSelector((state) => state.movies);

  // Helper function to get filtered movies excluding a specific filter
  const getFilteredMoviesExcluding = useCallback(
    (excludeKey: FilterKey) => {
      const tempFilters = { ...filters };
      if (excludeKey === "search") {
        tempFilters.search = "";
      } else {
        tempFilters[excludeKey] = null;
      }
      return applyMovieFilters(movies, tempFilters);
    },
    [filters, movies]
  );

  // Calculate available options based on currently filtered movies
  const filterOptions = useMemo<FilterOptions>(() => {
    const getUniqueValues = (
      key: "year" | "genre" | "country" | "language",
      sourceMovies: Movie[]
    ) => {
      if (key === "year") {
        return [...new Set(sourceMovies.map((movie) => movie[key]))].sort();
      }
      const values = sourceMovies.flatMap((movie) => movie[key]);
      return [...new Set(values)].sort();
    };

    return {
      years: getUniqueValues("year", getFilteredMoviesExcluding("year")),
      genres: getUniqueValues("genre", getFilteredMoviesExcluding("genre")),
      countries: getUniqueValues(
        "country",
        getFilteredMoviesExcluding("country")
      ),
      languages: getUniqueValues(
        "language",
        getFilteredMoviesExcluding("language")
      ),
    };
  }, [getFilteredMoviesExcluding]);

  const handleFilterChange = (key: FilterKey, value: FilterValue | string) => {
    if (key === "search") {
      dispatch(setFilter({ key, value: value as string }));
    } else {
      dispatch(setFilter({ key, value: value as FilterValue }));
    }
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return {
    filters,
    filterOptions,
    handleFilterChange,
    handleClearFilters: () => dispatch(clearFilters()),
    hasActiveFilters,
  };
};
