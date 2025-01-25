import { vi } from "vitest";
import type { Movie, MovieFiltersReturn } from "@/types";

export const mockMovieBase: Movie = {
  title: "Test Movie",
  year: "2023",
  genre: ["Drama"],
  country: ["USA"],
  language: ["English"],
  imdb_rating: 8.5,
  oscar_nominations: 3,
  oscar_winning: 1,
  cast: ["Actor 1", "Actor 2"],
  oscar_nominations_list: [],
  oscar_winning_list: [],
};

export function createMockMovie(overrides: Partial<Movie> = {}): Movie {
  return {
    ...mockMovieBase,
    ...overrides,
  };
}

export function createMockFilterData(
  overrides: Partial<MovieFiltersReturn> = {}
): MovieFiltersReturn {
  return {
    filters: {
      search: "",
      year: null,
      genre: null,
      country: null,
      language: null,
    },
    filterOptions: {
      years: ["2023", "2022"],
      genres: ["Action", "Drama"],
      countries: ["USA", "UK"],
      languages: ["English", "French"],
    },
    filteredMovies: [],
    handleFilterChange: vi.fn(),
    handleClearFilters: vi.fn(),
    hasActiveFilters: false,
    ...overrides,
  };
}

export function setupTestPortal() {
  const portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "radix-portal");
  document.body.appendChild(portalRoot);
  return portalRoot;
}

export function setupRadixMocks() {
  Element.prototype.scrollIntoView = vi.fn();
  Element.prototype.hasPointerCapture = vi.fn();
  Element.prototype.releasePointerCapture = vi.fn();
}
