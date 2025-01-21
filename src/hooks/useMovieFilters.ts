import { useMemo } from "react";
import { useDispatch, useSelector } from "@/redux/hooks";
import { setFilter, clearFilters } from "@/redux/movies/dashboardSlice";
import type { FilterKey, FilterValue } from "@/types";

interface FilterOptions {
  years: string[];
  genres: string[];
  countries: string[];
  languages: string[];
}

export const useMovieFilters = () => {
  const dispatch = useDispatch();
  const { movies, filters } = useSelector((state) => state.movies);

  const filterOptions = useMemo<FilterOptions>(() => {
    const getUniqueValues = (
      key: "year" | "genre" | "country" | "language"
    ) => {
      if (key === "year") {
        return [...new Set(movies.map((movie) => movie[key]))].sort();
      }
      const values = movies.flatMap((movie) => movie[key]);
      return [...new Set(values)].sort();
    };

    return {
      years: getUniqueValues("year"),
      genres: getUniqueValues("genre"),
      countries: getUniqueValues("country"),
      languages: getUniqueValues("language"),
    };
  }, [movies]);

  const handleFilterChange = (key: FilterKey, value: FilterValue | string) => {
    // Type guard to ensure type safety
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
