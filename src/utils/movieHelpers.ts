import type { Movie, OscarStats, Filters } from "@/types";

export const calculateOscarStats = (movies: Movie[]): OscarStats => {
  return movies.reduce(
    (acc, movie) => {
      const year = movie.year;
      acc.nominationsByYear[year] =
        (acc.nominationsByYear[year] || 0) + movie.oscar_nominations;
      acc.winsByYear[year] = (acc.winsByYear[year] || 0) + movie.oscar_winning;
      return acc;
    },
    { nominationsByYear: {}, winsByYear: {} } as OscarStats
  );
};

export const getUniqueValues = <T extends keyof Movie>(
  movies: Movie[],
  key: T
): Movie[T][] => {
  if (key === "year") {
    return [...new Set(movies.map((movie) => movie[key]))].sort().reverse();
  }

  const allValues = movies.flatMap((movie) =>
    Array.isArray(movie[key]) ? movie[key] : [movie[key]]
  );
  return [...new Set(allValues)].sort();
};

export const applyMovieFilters = (
  movies: Movie[],
  filters: Filters
): Movie[] => {
  return movies.filter((movie) => {
    const searchMatch =
      !filters.search.trim() ||
      movie.title.toLowerCase().includes(filters.search.toLowerCase().trim());
    const yearMatch = !filters.year || movie.year === filters.year;
    const genreMatch = !filters.genre || movie.genre.includes(filters.genre);
    const countryMatch =
      !filters.country || movie.country.includes(filters.country);
    const languageMatch =
      !filters.language || movie.language.includes(filters.language);

    return (
      searchMatch && yearMatch && genreMatch && countryMatch && languageMatch
    );
  });
};
