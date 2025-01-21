// src/components/MovieSearchFilters.tsx
import { Search, X } from "lucide-react";
import { useDispatch, useSelector } from "@/redux/hooks";
import { setFilter, clearFilters } from "@/redux/movies/dashboardSlice";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const MovieSearchFilters = () => {
  const dispatch = useDispatch();
  const { movies, filters } = useSelector((state) => state.movies);

  // Helper function to extract unique values from the movies array
  const getUniqueValues = (key: "year" | "genre" | "country" | "language") => {
    if (key === "year") {
      return [...new Set(movies.map((movie) => movie.year))].sort().reverse();
    }

    const allValues = movies.flatMap((movie) =>
      Array.isArray(movie[key]) ? movie[key] : [movie[key]]
    );
    return [...new Set(allValues)].sort();
  };

  const years = getUniqueValues("year");
  const genres = getUniqueValues("genre");
  const countries = getUniqueValues("country");
  const languages = getUniqueValues("language");

  // Handlers for each filter type
  const handleSearch = (value: string) => {
    dispatch(setFilter({ key: "search", value }));
  };

  const handleYearFilter = (value: string | null) => {
    dispatch(setFilter({ key: "year", value }));
  };

  const handleGenreFilter = (value: string | null) => {
    dispatch(setFilter({ key: "genre", value }));
  };

  const handleCountryFilter = (value: string | null) => {
    dispatch(setFilter({ key: "country", value }));
  };

  const handleLanguageFilter = (value: string | null) => {
    dispatch(setFilter({ key: "language", value }));
  };

  const hasActiveFilters =
    filters.search ||
    filters.year ||
    filters.genre ||
    filters.country ||
    filters.language;

  return (
    <div className="space-y-2">
      {/* Search bar - Full width on all screens */}
      <div className="relative w-full">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search movies..."
          className="pl-8 rounded-lg"
          value={filters.search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {filters.search && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-7 w-7 px-0"
            onClick={() => handleSearch("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter selects - Grid layout that adapts to screen size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <Select
          value={filters.year || "all"}
          onValueChange={(value) =>
            handleYearFilter(value === "all" ? null : value)
          }
        >
          <SelectTrigger className="w-full rounded-lg">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.genre || "all"}
          onValueChange={(value) =>
            handleGenreFilter(value === "all" ? null : value)
          }
        >
          <SelectTrigger className="w-full rounded-lg">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.country || "all"}
          onValueChange={(value) =>
            handleCountryFilter(value === "all" ? null : value)
          }
        >
          <SelectTrigger className="w-full rounded-lg">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.language || "all"}
          onValueChange={(value) =>
            handleLanguageFilter(value === "all" ? null : value)
          }
        >
          <SelectTrigger className="w-full rounded-lg">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear filters button in its own row */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-lg"
            onClick={() => dispatch(clearFilters())}
          >
            <X className="h-4 w-4" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default MovieSearchFilters;
