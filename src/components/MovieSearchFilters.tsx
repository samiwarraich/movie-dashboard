// src/components/MovieSearchFilters.tsx
import { Search, X } from "lucide-react";
import { useMovieFilters } from "@/hooks/useMovieFilters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterSelect } from "./FilterSelect";

// Define the mapping between filter keys and their option keys
const selectFilters = {
  year: "years",
  genre: "genres",
  country: "countries",
  language: "languages",
} as const;

// Create a type for the option keys
type OptionKey = (typeof selectFilters)[keyof typeof selectFilters];

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
        {(
          Object.entries(selectFilters) as [
            keyof typeof selectFilters,
            OptionKey
          ][]
        ).map(([key, optionsKey]) => (
          <FilterSelect
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={filters[key]}
            options={filterOptions[optionsKey]}
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
