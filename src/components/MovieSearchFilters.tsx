import { Search, X } from "lucide-react";
import { useMovieFilters } from "@/hooks/useMovieFilters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterSelect } from "./FilterSelect";
import type { FilterKey } from "@/types";

type FilterOptionsKey = "years" | "genres" | "countries" | "languages";
const filterMappings: Record<FilterKey, FilterOptionsKey> = {
  year: "years",
  genre: "genres",
  country: "countries",
  language: "languages",
  search: "years", // This won't be used but is needed for the type
};

const MovieSearchFilters = () => {
  const {
    filters,
    filterOptions,
    handleFilterChange,
    handleClearFilters,
    hasActiveFilters,
  } = useMovieFilters();

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="relative w-full">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search movies..."
          className="pl-8"
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
        {filters.search && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-7 w-7 p-0"
            onClick={() => handleFilterChange("search", "")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter selects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {(["year", "genre", "country", "language"] as const).map((key) => (
          <FilterSelect
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={filters[key]}
            options={filterOptions[filterMappings[key]]}
            onChange={(value) => handleFilterChange(key, value)}
          />
        ))}
      </div>

      {/* Clear filters button */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleClearFilters}
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
