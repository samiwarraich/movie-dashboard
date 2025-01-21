// src/hooks/useOscarStats.ts
import { useMemo } from "react";
import { useMovieFilters } from "./useMovieFilters";

export const useOscarStats = () => {
  const { filteredMovies } = useMovieFilters();

  const stats = useMemo(() => {
    const initialStats = {
      nominationsByYear: {} as Record<string, number>,
      winsByYear: {} as Record<string, number>,
      totalNominations: 0,
      totalWins: 0,
    };

    return filteredMovies.reduce((acc, movie) => {
      // Initialize year if not exists
      if (!acc.nominationsByYear[movie.year]) {
        acc.nominationsByYear[movie.year] = 0;
        acc.winsByYear[movie.year] = 0;
      }

      // Add nominations and wins
      acc.nominationsByYear[movie.year] += movie.oscar_nominations;
      acc.winsByYear[movie.year] += movie.oscar_winning;
      acc.totalNominations += movie.oscar_nominations;
      acc.totalWins += movie.oscar_winning;

      return acc;
    }, initialStats);
  }, [filteredMovies]); // Now depends on filtered movies

  return { stats };
};
