import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import TopPerformers from "@/components/top-performers";
import { useMovieFilters } from "@/hooks/use-movie-filters";
import { createMockFilterData, createMockMovie } from "@/lib/test-utils";

vi.mock("@/hooks/use-movie-filters");
const mockUseMovieFilters = vi.mocked(useMovieFilters);

describe("TopPerformers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Movies View", () => {
    beforeEach(() => {
      const mockMovies = [
        createMockMovie({
          title: "Top Movie",
          imdb_rating: 9.0,
          year: "2023",
        }),
        createMockMovie({
          title: "Second Movie",
          imdb_rating: 8.5,
          year: "2022",
        }),
      ];

      mockUseMovieFilters.mockReturnValue(
        createMockFilterData({
          filteredMovies: mockMovies,
        })
      );
    });

    it("renders movies table headers correctly", () => {
      render(<TopPerformers view="movies" />);

      const expectedHeaders = ["Rank", "Title", "Year", "Rating"];
      expectedHeaders.forEach((header) => {
        expect(screen.getByText(header)).toBeInTheDocument();
      });
    });

    it("displays movies in correct order by rating", () => {
      render(<TopPerformers view="movies" />);

      const rows = screen.getAllByRole("row").slice(1);
      expect(rows[0]).toHaveTextContent("Top Movie");
      expect(rows[1]).toHaveTextContent("Second Movie");
    });

    it("displays correct ranking numbers", () => {
      render(<TopPerformers view="movies" />);
      expect(screen.getByText("#1")).toBeInTheDocument();
      expect(screen.getByText("#2")).toBeInTheDocument();
    });

    it("limits results to top 10", () => {
      const manyMovies = Array.from({ length: 15 }, (_, i) =>
        createMockMovie({
          title: `Movie ${i + 1}`,
          imdb_rating: 9.0 - i * 0.1,
        })
      );

      mockUseMovieFilters.mockReturnValue(
        createMockFilterData({
          filteredMovies: manyMovies,
        })
      );

      render(<TopPerformers view="movies" />);

      const rows = screen.getAllByRole("row").slice(1);
      expect(rows).toHaveLength(10);
      expect(rows[0]).toHaveTextContent("Movie 1");
    });

    it("handles empty movie list", () => {
      mockUseMovieFilters.mockReturnValue(
        createMockFilterData({
          filteredMovies: [],
        })
      );

      render(<TopPerformers view="movies" />);

      expect(screen.getByText("Rank")).toBeInTheDocument();
      expect(screen.getByText("Title")).toBeInTheDocument();

      const rows = screen.getAllByRole("row");
      expect(rows.length).toBe(1);
    });
  });

  describe("Actors View", () => {
    beforeEach(() => {
      const mockMovies = [
        createMockMovie({
          cast: ["Actor A", "Actor B"],
          oscar_winning: 3,
        }),
        createMockMovie({
          cast: ["Actor B", "Actor C"],
          oscar_winning: 1,
        }),
      ];

      mockUseMovieFilters.mockReturnValue(
        createMockFilterData({
          filteredMovies: mockMovies,
        })
      );
    });

    it("renders actors table headers correctly", () => {
      render(<TopPerformers view="actors" />);

      const expectedHeaders = ["Rank", "Actor", "Movies", "Oscar Wins"];
      expectedHeaders.forEach((header) => {
        expect(screen.getByText(header)).toBeInTheDocument();
      });
    });

    it("aggregates actor stats correctly", () => {
      render(<TopPerformers view="actors" />);

      const rows = screen.getAllByRole("row").slice(1);
      const firstRow = rows[0];

      expect(firstRow).toHaveTextContent("Actor B");
      expect(firstRow).toHaveTextContent("2");
      expect(firstRow).toHaveTextContent("4");
    });

    it("sorts actors by wins and then by number of movies", () => {
      render(<TopPerformers view="actors" />);

      const rows = screen.getAllByRole("row").slice(1);
      expect(rows[0]).toHaveTextContent("Actor B");
      expect(rows[1]).toHaveTextContent("Actor A");
      expect(rows[2]).toHaveTextContent("Actor C");
    });

    it("handles actors with single movie appearance", () => {
      const mockMovies = [
        createMockMovie({
          cast: ["Actor 1", "Actor 2"],
          oscar_winning: 1,
        }),
      ];

      mockUseMovieFilters.mockReturnValue(
        createMockFilterData({
          filteredMovies: mockMovies,
        })
      );

      render(<TopPerformers view="actors" />);

      const actorRows = screen.getAllByRole("row").slice(1);
      expect(
        actorRows.some((row) => row.textContent?.includes("Actor 1"))
      ).toBeTruthy();
      expect(
        actorRows.some((row) => row.textContent?.includes("Actor 2"))
      ).toBeTruthy();
    });
  });
});
