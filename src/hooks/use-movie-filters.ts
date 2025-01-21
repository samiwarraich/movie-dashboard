import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "@/redux/hooks";
import { setFilter, clearFilters } from "@/redux/movies/dashboard-slice";
import {
  applyMovieFilters,
  getUniqueValues,
  getFilteredMoviesExcludingFilter,
} from "@/lib/movie-helpers";
import type { FilterKey } from "@/types";

export const useMovieFilters = () => {
  const dispatch = useDispatch();
  const { movies, filters } = useSelector((state) => state.movies);

  const filteredMovies = useMemo(() => {
    return applyMovieFilters(movies, filters);
  }, [movies, filters]);

  // Calculate filter options based on movies filtered by other filters
  const filterOptions = useMemo(() => {
    return {
      years: getUniqueValues(
        getFilteredMoviesExcludingFilter(movies, filters, "year"),
        "year"
      ),
      genres: getUniqueValues(
        getFilteredMoviesExcludingFilter(movies, filters, "genre"),
        "genre"
      ),
      countries: getUniqueValues(
        getFilteredMoviesExcludingFilter(movies, filters, "country"),
        "country"
      ),
      languages: getUniqueValues(
        getFilteredMoviesExcludingFilter(movies, filters, "language"),
        "language"
      ),
    };
  }, [movies, filters]);

  const handleFilterChange = useCallback(
    (key: FilterKey, value: string | null) => {
      dispatch(setFilter({ key, value }));
    },
    [dispatch]
  );

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const hasActiveFilters = Boolean(
    filters.search ||
      filters.year ||
      filters.genre ||
      filters.country ||
      filters.language
  );

  return {
    filters,
    filterOptions,
    filteredMovies,
    handleFilterChange,
    handleClearFilters,
    hasActiveFilters,
  };
};
